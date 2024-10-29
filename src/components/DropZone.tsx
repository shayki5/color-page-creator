import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-effect border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 transform
        ${isDragActive 
          ? 'border-purple-500 bg-purple-50/50 scale-102' 
          : 'border-gray-300 hover:border-purple-400 hover:scale-[1.01]'
        }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-20"></div>
          <div className="relative p-6 bg-white rounded-2xl shadow-md">
            {isDragActive ? (
              <Upload className="w-12 h-12 text-purple-500" />
            ) : (
              <ImageIcon className="w-12 h-12 text-purple-500" />
            )}
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            {isDragActive
              ? "Drop it like it's hot! 🔥"
              : "Drag & drop your masterpiece"}
          </p>
          <p className="text-gray-500">
            or click to browse your files
          </p>
        </div>
        <div className="flex gap-2 text-sm text-gray-400">
          <span className="px-2 py-1 rounded-full bg-gray-100">PNG</span>
          <span className="px-2 py-1 rounded-full bg-gray-100">JPG</span>
          <span className="px-2 py-1 rounded-full bg-gray-100">JPEG</span>
          <span className="px-2 py-1 rounded-full bg-gray-100">WebP</span>
        </div>
      </div>
    </div>
  );
};