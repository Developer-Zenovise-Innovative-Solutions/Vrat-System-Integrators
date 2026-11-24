import React, { useState, useRef } from "react";
import { uploadDocumentToStorage, detectDocumentType } from "../lib/storageService";
import {
  FileText,
  UploadCloud,
  FileCode,
  FileArchive,
  File,
  X,
  CheckCircle2,
  Link2,
  AlertCircle,
  Loader2,
  Download
} from "lucide-react";

interface FileUploaderProps {
  value?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: "PDF" | "DOC" | "ZIP" | "SOFTWARE";
  onUploadComplete: (info: {
    url: string;
    fileName: string;
    fileSize: string;
    fileType: "PDF" | "DOC" | "ZIP" | "SOFTWARE";
  }) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

export default function FileUploader({
  value = "",
  fileName = "",
  fileSize = "",
  fileType = "PDF",
  onUploadComplete,
  label = "Document File Asset",
  helperText = "Drag & drop PDF, Word, ZIP or technical file up to 25MB",
  className = "",
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-8 h-8 text-rose-400" />;
      case "DOC":
        return <FileText className="w-8 h-8 text-blue-400" />;
      case "ZIP":
        return <FileArchive className="w-8 h-8 text-amber-400" />;
      case "SOFTWARE":
        return <FileCode className="w-8 h-8 text-emerald-400" />;
      default:
        return <File className="w-8 h-8 text-slate-400" />;
    }
  };

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const res = await uploadDocumentToStorage(file, "documents");
      onUploadComplete({
        url: res.url,
        fileName: res.name,
        fileSize: res.fileSize,
        fileType: res.fileType,
      });
      setUrlInput(res.url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload document file.");
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

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      const detected = detectDocumentType(urlInput.trim());
      onUploadComplete({
        url: urlInput.trim(),
        fileName: urlInput.split("/").pop()?.split("?")[0] || "document",
        fileSize: fileSize || "1.0 MB",
        fileType: detected,
      });
      setShowUrlInput(false);
      setError("");
    }
  };

  const handleRemove = () => {
    onUploadComplete({
      url: "",
      fileName: "",
      fileSize: "",
      fileType: "PDF",
    });
    setUrlInput("");
    setError("");
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
          {showUrlInput ? "Hide External Link" : "Enter External Download URL"}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 animate-fade-in">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/files/spec-sheet.pdf or Google Drive link"
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

      {/* Uploaded File Card */}
      {value ? (
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
              {getFileIcon(fileType)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white text-xs font-bold truncate">
                  {fileName || "Document File Attached"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {fileType}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span>{fileSize || "Uploaded"}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready for website download
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg transition"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Drag & Drop Dropbox */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-800 hover:border-slate-700 bg-slate-950/60 hover:bg-slate-950"
          }`}
        >
          {uploading ? (
            <div className="py-2 flex flex-col items-center gap-2">
              <Loader2 className="w-7 h-7 text-blue-400 animate-spin" />
              <p className="text-xs text-blue-300 font-medium">Uploading document to storage...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  Click to select file, or drag and drop here
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.7z,.txt"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}

