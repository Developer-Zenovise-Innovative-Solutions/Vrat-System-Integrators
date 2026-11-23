import React, { useState, useRef } from "react";
import { uploadImageToStorage, deleteImageFromStorage } from "../lib/storageService";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  RefreshCw,
  Link2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  helperText?: string;
  className?: string;
}

export default function ImageUploader({
  value = "",
  onChange,
  folder = "website",
  label = "Image Asset",
  helperText = "Drag & drop JPG, PNG, WEBP or SVG up to 8MB",
  className = "",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const oldUrl = value;
      const result = await uploadImageToStorage(file, folder);

      if (result.url) {
        onChange(result.url);
        setUrlInput(result.url);
        // Clean up previous image if it was hosted on Supabase storage
        if (oldUrl && oldUrl !== result.url && oldUrl.includes("supabase.co")) {
          deleteImageFromStorage(oldUrl);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    if (value && value.includes("supabase.co")) {
      deleteImageFromStorage(value);
    }
    onChange("");
    setUrlInput("");
    setError("");
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setShowUrlInput(false);
      setError("");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
        >
          <Link2 className="w-3 h-3" />
          {showUrlInput ? "Hide Direct URL" : "Enter Direct URL"}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 animate-fade-in">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs transition"
          >
            Apply URL
          </button>
        </div>
      )}

      {value ? (
        /* Image Preview Card */
        <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 flex items-center gap-3">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-850 flex items-center justify-center">
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              onError={(e) => {
                // If image fails, show fallback icon
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Image Asset Ready</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-xs">{value}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <RefreshCw className={`w-3 h-3 ${uploading ? "animate-spin" : ""}`} />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-medium flex items-center gap-1 transition"
              >
                <X className="w-3 h-3" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Dropzone Box */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-950"
          }`}
        >
          {uploading ? (
            <div className="py-3 flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
              <span className="text-xs font-semibold text-slate-300">Uploading to Cloud Storage...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-1">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-200">
                <span className="text-blue-400 hover:underline">Click to upload</span> or drag and drop
              </div>
              <p className="text-[10px] text-slate-500">{helperText}</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-rose-400 text-[11px] pt-1">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />
    </div>
  );
}

