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
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      <div 
        {...getRootProps()} 
        className={`
          relative overflow-hidden rounded-2xl p-12 text-center cursor-pointer transition-all duration-500
          ${isDragActive 
            ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]' 
            : 'glass-card hover:border-cyan-500/50 hover:scale-[1.01]'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          neon-border
        `}
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="space-y-4 relative z-10">
            <div className="relative inline-block">
              <div className="max-h-80 mx-auto relative rounded-xl border border-cyan-500/20 shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                <Image
                  src={preview}
                  alt="Diagram preview"
                  unoptimized
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-500/30">
                ✓
              </div>
            </div>
            <p className="text-sm text-gray-400 font-mono">
              <span className="text-cyan-400">$</span> diagram-uploaded ✓
            </p>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 font-mono border border-cyan-500/20 hover:border-cyan-500/40 px-4 py-2 rounded-lg transition-all">
              <span className="text-cyan-400">$</span> change-file
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            <div className="inline-block p-6 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl border border-cyan-500/20 animate-float">
              <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {isDragActive ? '📥 Drop your diagram' : 'Upload Architecture Diagram'}
              </p>
              <p className="text-gray-400 mt-2 max-w-md mx-auto font-light">
                {isDragActive 
                  ? 'Initializing analysis pipeline...' 
                  : 'Drag & drop your diagram or click to browse'
                }
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">.png</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">.jpg</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">.svg</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-gray-400">.gif</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-mono">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>encrypted</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span>temporary</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span>secure</span>
            </div>
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="mt-6 flex items-center justify-center space-x-4 glass-card rounded-xl p-4 border border-cyan-500/10">
          <div className="relative">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500/20 border-t-cyan-500"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <div className="font-mono">
            <p className="text-cyan-400 text-sm">Analyzing diagram<span className="loading-dots"></span></p>
            <p className="text-gray-500 text-xs">Processing with AI models...</p>
          </div>
        </div>
      )}
    </div>
  );
}