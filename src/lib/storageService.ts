import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET_NAME = "website-media";

/**
 * Uploads an image file to Supabase Storage bucket 'website-media'.
 * Falls back to base64 data URL if storage bucket is unavailable.
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

  // Validate size (max 8MB)
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("File size exceeds 8MB limit. Please upload a smaller image.");
  }

  if (!isSupabaseConfigured) {
    // Return base64 preview
    const base64 = await fileToBase64(file);
    return { url: base64, success: true, message: "Loaded locally (Supabase not configured)" };
  }

  try {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${folder}/${Date.now()}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.warn("Supabase storage upload returned error, falling back:", error.message);
      // If bucket doesn't exist, try 'media' or fallback to base64
      const fallbackUpload = await supabase.storage.from("media").upload(filePath, file, { upsert: true });
      if (!fallbackUpload.error) {
        const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(filePath);
        return { url: publicUrlData.publicUrl, path: filePath, success: true };
      }
      const base64 = await fileToBase64(file);
      return { url: base64, success: true, message: "Storage bucket not public; saved locally" };
    }

    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return {
      url: publicUrlData.publicUrl,
      path: filePath,
      success: true,
      message: "Image uploaded successfully to cloud storage",
    };
  } catch (err: any) {
    console.warn("Storage upload exception, fallback to base64:", err);
    const base64 = await fileToBase64(file);
    return { url: base64, success: true, message: "Saved as local image" };
  }
}

/**
 * Removes an old image file from Supabase storage if it was hosted there
 */
export async function deleteImageFromStorage(imageUrl: string): Promise<void> {
  if (!imageUrl || !isSupabaseConfigured) return;
  try {
    if (imageUrl.includes(BUCKET_NAME)) {
      const parts = imageUrl.split(`/${BUCKET_NAME}/`);
      if (parts[1]) {
        const path = decodeURIComponent(parts[1].split("?")[0]);
        await supabase.storage.from(BUCKET_NAME).remove([path]);
      }
    }
  } catch (e) {
    console.warn("Cleanup of old storage image:", e);
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

