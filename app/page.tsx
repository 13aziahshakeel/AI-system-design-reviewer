'use client';

import React, { useState } from 'react';
import DiagramUploader from '../components/DiagramUploader';
import AnalysisResult from '../components/AnalysisResult';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏗️ System Design Reviewer
          </h1>
          <p className="text-gray-600">
            Upload your system architecture diagram for AI-powered analysis on scalability, 
            reliability, and performance bottlenecks
          </p>
        </div>

        <DiagramUploader onUpload={handleUpload} isLoading={isLoading} />

        {error && (
          <div className="max-w-4xl mx-auto mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {analysis && <AnalysisResult analysis={analysis} />}

        {!analysis && !isLoading && !error && (
          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How it works:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📤</span>
                </div>
                <h4 className="font-medium text-gray-800">1. Upload</h4>
                <p className="text-sm text-gray-600">Upload your architecture diagram image</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="font-medium text-gray-800">2. AI Analysis</h4>
                <p className="text-sm text-gray-600">Vision API analyzes components and structure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-medium text-gray-800">3. Review</h4>
                <p className="text-sm text-gray-600">Get detailed feedback on your architecture</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}