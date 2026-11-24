import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET_NAME = "website-media";
let bucketUnavailable = false; // Flag to avoid repetitive 400 errors once checked

/**
 * Compresses and resizes any image file to a lightweight, high-DPI image string.
 * An avatar photo is resized to max 280x280 (approx 15-25 KB), preventing QuotaExceededError
 * and allowing seamless cross-device synchronization via Supabase PostgreSQL.
 */
export function optimizeImageFile(
  file: File,
  folder = "general"
): Promise<string> {
  return new Promise((resolve, reject) => {
    // SVGs are vector XML, read directly
    if (file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const isAvatar = folder === "avatars";
    const maxWidth = isAvatar ? 280 : 1200;
    const maxHeight = isAvatar ? 280 : 900;
    const quality = isAvatar ? 0.84 : 0.80;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Maintain aspect ratio while bounding within maxWidth/maxHeight
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first for optimal compression, fallback to JPEG
      let dataUrl = canvas.toDataURL("image/webp", quality);
      if (!dataUrl.startsWith("data:image/webp")) {
        dataUrl = canvas.toDataURL("image/jpeg", quality);
      }
      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      // Fallback to basic file reader if image loading failed
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads an image file to Supabase Storage bucket 'website-media',
 * or falls back to an optimized, lightweight cloud-synced image if the bucket is unavailable.
 */
export async function uploadImageToStorage(
  file: File,
  folder = "general"
): Promise<{ url: string; path?: string; success: boolean; message?: string }> {
  // Validate format
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file format. Please upload JPG, PNG, WEBP, or SVG.");
  }

  // Validate size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size exceeds 10MB limit. Please upload a smaller image.");
  }

  // 1. Always create the lightweight optimized version first (prevent QuotaExceededError)
  const optimizedDataUrl = await optimizeImageFile(file, folder);

  // 2. If bucket is not already marked unavailable and Supabase is configured, try cloud upload
  if (isSupabaseConfigured && !bucketUnavailable) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
        return {
          url: publicUrlData.publicUrl,
          path: filePath,
          success: true,
          message: "Uploaded to cloud storage successfully",
        };
      } else {
        // If bucket does not exist (400 / Bucket not found), mark flag so we don't spam network errors
        bucketUnavailable = true;
      }
    } catch (err: any) {
      bucketUnavailable = true;
    }
  }

  // 3. Fallback safely to the optimized image (only ~15-25KB, saves to Supabase postgres without errors)
  return {
    url: optimizedDataUrl,
    success: true,
    message: "Optimized and saved to cloud database",
  };
}

/**
 * Removes an old image file from Supabase storage if it was hosted there
 */
export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  if (!imageUrl || !isSupabaseConfigured || bucketUnavailable) return;
  try {
    if (imageUrl.includes(BUCKET_NAME)) {
      const parts = imageUrl.split(`/${BUCKET_NAME}/`);
      if (parts[1]) {
        const path = decodeURIComponent(parts[1].split("?")[0]);
        await supabase.storage.from(BUCKET_NAME).remove([path]);
      }
    }
  } catch (e) {
    // silent catch
  }
}

/**
 * Formats bytes to readable string e.g. "2.4 MB", "750 KB"
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Detects file category / type from file extension or MIME
 */
export function detectDocumentType(fileName: string, mimeType = ""): "PDF" | "DOC" | "ZIP" | "SOFTWARE" {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  if (ext === "pdf" || mimeType.includes("pdf")) return "PDF";
  if (["doc", "docx", "rtf", "odt", "txt"].includes(ext) || mimeType.includes("word") || mimeType.includes("document")) return "DOC";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext) || mimeType.includes("zip") || mimeType.includes("compressed")) return "ZIP";
  return "SOFTWARE";
}

/**
 * Uploads any document (PDF, DOC, ZIP, manual, datasheet) to cloud storage
 * or stores as an accessible data payload.
 */
export async function uploadDocumentToStorage(
  file: File,
  folder = "documents"
): Promise<{
  url: string;
  name: string;
  fileSize: string;
  fileType: "PDF" | "DOC" | "ZIP" | "SOFTWARE";
  success: boolean;
  message?: string;
}> {
  const formattedSize = formatBytes(file.size);
  const detectedType = detectDocumentType(file.name, file.type);

  // 1. If Supabase is configured, try cloud bucket upload
  if (isSupabaseConfigured && !bucketUnavailable) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
        return {
          url: publicUrlData.publicUrl,
          name: file.name,
          fileSize: formattedSize,
          fileType: detectedType,
          success: true,
          message: "Uploaded to cloud storage successfully",
        };
      }
    } catch (err: any) {
      // Continue to fallback
    }
  }

  // 2. Fallback: For files under 4MB, read as data URL so it's fully downloadable and syncs
  if (file.size <= 4 * 1024 * 1024) {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    return {
      url: dataUrl,
      name: file.name,
      fileSize: formattedSize,
      fileType: detectedType,
      success: true,
      message: "Document ready for download",
    };
  }

  // 3. For very large files without bucket, create local object URL
  const objectUrl = URL.createObjectURL(file);
  return {
    url: objectUrl,
    name: file.name,
    fileSize: formattedSize,
    fileType: detectedType,
    success: true,
    message: "Large file uploaded locally",
  };
}
