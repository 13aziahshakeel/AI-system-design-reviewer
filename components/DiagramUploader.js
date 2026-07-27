'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

export default function DiagramUploader({ onUpload, isLoading }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="space-y-4">
            <div className="mx-auto" style={{ maxHeight: '16rem' }}>
              <Image
                src={preview}
                alt="Preview"
                width={512}
                height={256}
                className="mx-auto object-contain"
                style={{ maxHeight: '16rem', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-gray-500">Click or drag to upload a new diagram</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl">📤</div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {isDragActive ? 'Drop your diagram here' : 'Upload your system architecture diagram'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag & drop or click to select (PNG, JPG, SVG, GIF)
              </p>
            </div>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Analyzing your diagram...</span>
        </div>
      )}
    </div>
  );
}