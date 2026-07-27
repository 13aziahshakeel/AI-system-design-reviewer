'use client';

import React, { useState } from 'react';

export default function AnalysisResult({ analysis }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!analysis) return null;

  const { scalability, reliability, bottlenecks, recommendations } = analysis;

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'scalability', label: '🚀 Scalability' },
    { id: 'reliability', label: '🛡️ Reliability' },
    { id: 'bottlenecks', label: '⚠️ Bottlenecks' },
    { id: 'recommendations', label: '💡 Recommendations' },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreRing = (score) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 space-y-6 animate-slide-up">
      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-6 neon-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-gray-500">OVERALL HEALTH</p>
              <p className="text-3xl font-bold text-white mt-1">
                {Math.round((scalability.score + reliability.score) / 2)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/20">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${(scalability.score + reliability.score) / 2}%` }}
            ></div>
          </div>
        </div>

        {[
          { label: 'SCALABILITY', score: scalability.score, icon: '🚀', color: 'cyan' },
          { label: 'RELIABILITY', score: reliability.score, icon: '🛡️', color: 'purple' },
          { label: 'ISSUES', score: bottlenecks.length + (reliability.singlePointsOfFailure?.length || 0), icon: '🔴', color: 'pink' }
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-gray-500">{item.label}</p>
                <p className={`text-3xl font-bold mt-1 ${getScoreColor(item.score)}`}>
                  {item.score}{typeof item.score === 'number' && item.label !== 'ISSUES' ? '%' : ''}
                </p>
              </div>
              <div className={`w-12 h-12 bg-${item.color}-500/10 rounded-xl flex items-center justify-center border border-${item.color}-500/20`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="border-b border-white/5">
          <nav className="flex overflow-x-auto p-1 gap-1" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-2.5 text-sm font-mono rounded-lg transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/20' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">
                <span className="text-cyan-400">$</span> system-overview
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Analysis complete. Detected <span className="text-cyan-400">{scalability.strengths.length}</span> strengths 
                and <span className="text-yellow-400">{bottlenecks.length}</span> bottlenecks.
                {reliability.singlePointsOfFailure?.length > 0 
                  ? ` ⚠️ ${reliability.singlePointsOfFailure.length} SPOF detected.`
                  : ' ✅ No SPOF found.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                  <p className="text-xs font-mono text-green-400">✅ STRENGTHS</p>
                  <ul className="mt-2 space-y-1">
                    {scalability.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                        {s}
                      </li>
                    ))}
                    {scalability.strengths.length === 0 && (
                      <li className="text-sm text-gray-500">None identified</li>
                    )}
                  </ul>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                  <p className="text-xs font-mono text-yellow-400">⚠️ WEAKNESSES</p>
                  <ul className="mt-2 space-y-1">
                    {scalability.weaknesses.map((w, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                        {w}
                      </li>
                    ))}
                    {scalability.weaknesses.length === 0 && (
                      <li className="text-sm text-gray-500">None identified</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scalability' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">
                <span className="text-cyan-400">$</span> scalability-analysis
              </h3>
              <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle className="w-24 h-24 text-white/5" strokeWidth="6" stroke="currentColor" fill="none" r="36" cx="48" cy="48"/>
                    <circle className={`w-24 h-24 ${getScoreRing(scalability.score)}`} strokeWidth="6" strokeDasharray={`${scalability.score * 2.26} 226`} strokeLinecap="round" fill="none" r="36" cx="48" cy="48"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                    {scalability.score}%
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">
                    Score: <span className={getScoreColor(scalability.score)}>{scalability.score}%</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {scalability.score >= 80 ? '🌟 Excellent scalability' :
                     scalability.score >= 60 ? '👍 Good, room for improvement' :
                     '🔧 Needs significant improvement'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {scalability.details.canScaleHorizontally && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/20 font-mono">
                        HORIZONTAL
                      </span>
                    )}
                    {scalability.details.canScaleVertically && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/20 font-mono">
                        VERTICAL
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reliability' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">
                <span className="text-cyan-400">$</span> reliability-analysis
              </h3>
              {reliability.singlePointsOfFailure?.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <h4 className="font-medium text-red-400 flex items-center gap-2 text-sm font-mono">
                    <span>🚨</span> SINGLE POINTS OF FAILURE
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {reliability.singlePointsOfFailure.map((spof, i) => (
                      <li key={i} className="text-sm text-red-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {spof}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                  <p className="text-xs font-mono text-green-400">✅ FEATURES</p>
                  <ul className="mt-2 space-y-1">
                    {reliability.hasRedundancy && <li className="text-sm text-gray-300">✓ Redundancy present</li>}
                    {reliability.hasLoadBalancer && <li className="text-sm text-gray-300">✓ Load balancing</li>}
                    {!reliability.hasRedundancy && !reliability.hasLoadBalancer && (
                      <li className="text-sm text-gray-500">No features detected</li>
                    )}
                  </ul>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                  <p className="text-xs font-mono text-yellow-400">⚠️ RISKS</p>
                  <ul className="mt-2 space-y-1">
                    {reliability.potentialRisks?.map((risk, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                        <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
                        {risk}
                      </li>
                    ))}
                    {(!reliability.potentialRisks || reliability.potentialRisks.length === 0) && (
                      <li className="text-sm text-gray-500">No risks identified</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bottlenecks' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">
                <span className="text-cyan-400">$</span> bottlenecks-scan
              </h3>
              {bottlenecks.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {bottlenecks.map((bottleneck, i) => (
                    <div 
                      key={i} 
                      className={`
                        rounded-xl p-4 border
                        ${bottleneck.severity === 'high' 
                          ? 'border-red-500/20 bg-red-500/5' 
                          : 'border-yellow-500/20 bg-yellow-500/5'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0
                          ${bottleneck.severity === 'high' ? 'bg-red-500/20' : 'bg-yellow-500/20'}
                        `}>
                          {bottleneck.severity === 'high' ? '🔴' : '🟡'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-white font-mono">{bottleneck.component}</h4>
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full font-mono
                              ${bottleneck.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}
                            `}>
                              {bottleneck.severity || 'medium'}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mt-1">{bottleneck.issue}</p>
                          {bottleneck.suggestion && (
                            <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/5">
                              <p className="text-sm text-cyan-400 font-mono">💡 {bottleneck.suggestion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <span className="text-6xl">🎉</span>
                  <p className="text-xl font-medium text-green-400 mt-4">No bottlenecks detected!</p>
                  <p className="text-gray-400 text-sm mt-1">Architecture is well-balanced.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-mono">
                <span className="text-cyan-400">$</span> recommendations
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div 
                    key={i} 
                    className={`
                      rounded-xl p-4 border transition-all hover:scale-[1.01]
                      ${rec.priority === 'Critical' ? 'border-red-500/20 bg-red-500/5' :
                        rec.priority === 'High' ? 'border-orange-500/20 bg-orange-500/5' :
                        'border-cyan-500/20 bg-cyan-500/5'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                            rec.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-cyan-500/20 text-cyan-400'
                          }`}>
                            {rec.priority || 'MEDIUM'}
                          </span>
                          <span className="text-xs font-mono text-gray-500">{rec.category}</span>
                        </div>
                        <p className="text-gray-200 mt-2">{rec.suggestion}</p>
                        {rec.impact && (
                          <p className="text-sm text-gray-400 mt-1 font-mono">
                            <span className="text-cyan-400">→</span> {rec.impact}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}