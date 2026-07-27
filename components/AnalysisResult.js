'use client';

import React from 'react';

export default function AnalysisResult({ analysis }) {
  if (!analysis) return null;

  const { scalability, reliability, bottlenecks, recommendations } = analysis;

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6">
      {/* Score Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Analysis Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Scalability Score</h3>
            <div className="flex items-end mt-2">
              <span className="text-3xl font-bold text-blue-600">{scalability.score}%</span>
              <span className="ml-2 text-sm text-blue-600">/ 100</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Reliability Score</h3>
            <div className="flex items-end mt-2">
              <span className="text-3xl font-bold text-green-600">{reliability.score}%</span>
              <span className="ml-2 text-sm text-green-600">/ 100</span>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800">Bottlenecks Found</h3>
            <div className="flex items-end mt-2">
              <span className="text-3xl font-bold text-yellow-600">{bottlenecks.length}</span>
              <span className="ml-2 text-sm text-yellow-600">issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Recommendations</h3>
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div 
                key={i} 
                className={`border-l-4 p-4 rounded-r-lg ${
                  rec.priority === 'Critical' ? 'border-red-500 bg-red-50' :
                  rec.priority === 'High' ? 'border-orange-500 bg-orange-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    rec.priority === 'Critical' ? 'bg-red-200 text-red-800' :
                    rec.priority === 'High' ? 'bg-orange-200 text-orange-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {rec.priority || 'Medium'}
                  </span>
                  <span className="text-xs font-medium text-gray-500">{rec.category}</span>
                </div>
                <p className="mt-2 text-gray-800">{rec.suggestion}</p>
                {rec.impact && (
                  <p className="mt-1 text-sm text-gray-600">Impact: {rec.impact}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-green-600">No recommendations needed!</p>
        )}
      </div>
    </div>
  );
}