'use client';

import React, { useState } from 'react';
import DiagramUploader from '../components/DiagramUploader';
import AnalysisResult from '../components/AnalysisResult';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append('diagram', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze diagram');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header - Clean & Modern */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">System</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Design
              </span>
              <span className="text-white">.</span>
              <span className="text-white font-light">Review</span>
            </h1>
            
            <p className="text-gray-400 max-w-xl mx-auto text-sm font-light tracking-wider mt-3">
              AI-Powered Architecture Intelligence
            </p>
            
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-600 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Online
              </span>
              <span className="w-px h-3 bg-white/10"></span>
              <span>v2.0.0</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="text-cyan-400/60">● Ready</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <DiagramUploader onUpload={handleUpload} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="max-w-4xl mx-auto mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="font-bold">Error: </strong>
                <span>{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Result */}
        {analysis && <AnalysisResult analysis={analysis} />}

        {/* How it works */}
        {!analysis && !isLoading && !error && (
          <div className="max-w-4xl mx-auto mt-16 glass-card rounded-2xl p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-white text-center mb-8">
              <span className="text-cyan-400">$</span> how-it-works.sh
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '📤', step: '01', title: 'Upload', desc: 'Upload your architecture diagram image', color: 'cyan' },
                { icon: '🤖', step: '02', title: 'Analyze', desc: 'Vision API analyzes components and structure', color: 'purple' },
                { icon: '📊', step: '03', title: 'Review', desc: 'Get detailed feedback on your architecture', color: 'pink' }
              ].map((item) => (
                <div key={item.step} className="text-center group">
                  <div className="relative inline-block">
                    <div className={`
                      w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl
                      bg-${item.color}-500/10 border border-${item.color}-500/20
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 text-xs font-mono text-gray-500 bg-black/50 px-2 py-0.5 rounded-full border border-white/5">
                      {item.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}