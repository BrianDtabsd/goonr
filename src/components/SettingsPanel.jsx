import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import TemplateContentEditor from './TemplateContentEditor';
import SetupGuide from './SetupGuide';
import VisibilityEditor from './VisibilityEditor';
import { isStudioMode } from '../lib/studioMode';
import { documindGlassCasefile, documindGlassDashboard } from '../lib/glassPresets';

function SettingsPanel() {
  const { theme, updateTheme, typographyBundles } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const onDesignSystem = pathname.startsWith('/design-system');
  const showPanel = isStudioMode() || onDesignSystem;

  if (!showPanel) return null;

  // Available colors for Primary and Frost
  const colors = [
    { label: 'White', hex: '#ffffff', rgb: '255, 255, 255' },
    { label: 'Black', hex: '#000000', rgb: '0, 0, 0' },
    { label: 'Ember', hex: '#FF5722', rgb: '255, 87, 34' },
    { label: 'Blue', hex: '#3b82f6', rgb: '59, 130, 246' },
    { label: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
    { label: 'Purple', hex: '#8b5cf6', rgb: '139, 92, 246' },
    { label: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94' },
    { label: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11' },
  ];

  if (!isOpen) {
    return (
      <div id="settings-panel">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
          aria-label="Open Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div id="settings-panel" className="fixed top-0 right-0 bottom-0 w-[min(32rem,calc(100vw-1rem))] bg-black/80 backdrop-blur-xl border-l border-white/10 z-50 p-6 overflow-y-auto shadow-2xl text-slate-200 text-sm" contentEditable="false">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Theme Settings</h2>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {onDesignSystem ? (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              DocuMind presets
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateTheme(documindGlassDashboard)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-xs hover:bg-slate-700"
              >
                Dashboard glass
              </button>
              <button
                type="button"
                onClick={() => updateTheme(documindGlassCasefile)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-xs hover:bg-slate-700"
              >
                Case file glass
              </button>
            </div>
          </div>
        ) : null}
        <SetupGuide />
        <VisibilityEditor />

        {/* Layout Mode */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Layout Mode</label>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${theme.layoutMode === 'cards' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
              onClick={() => updateTheme({ layoutMode: 'cards' })}
            >
              Floating Cards
            </button>
            <button
              className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${theme.layoutMode === 'container' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
              onClick={() => updateTheme({ layoutMode: 'container' })}
            >
              Global Container
            </button>
          </div>
        </div>

        {/* Background Image */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Background URL</label>
          <input
            type="text"
            value={theme.backgroundUrl}
            onChange={(e) => updateTheme({ backgroundUrl: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-4"
          />

          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Background Pattern</label>
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${theme.backgroundPattern === 'none' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
              onClick={() => updateTheme({ backgroundPattern: 'none' })}
            >
              None
            </button>
            <button
              className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${theme.backgroundPattern === 'mesh' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
              onClick={() => updateTheme({ backgroundPattern: 'mesh' })}
            >
              Mesh Grid
            </button>
          </div>
        </div>

        <TemplateContentEditor />

        {/* Typography Bundles */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Typography Bundle</label>
          <select
            value={theme.typographyPreset}
            onChange={(e) => updateTheme({ typographyPreset: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-2"
          >
            {Object.entries(typographyBundles).map(([key, bundle]) => (
              <option key={key} value={key}>{bundle.name}</option>
            ))}
          </select>
        </div>

        {/* Glass Settings */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Glass Effect</label>
          
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Frost Level (Blur)</span>
              <span className="text-slate-400">{theme.frostLevel}</span>
            </div>
            <input
              type="range"
              min="0" max="64"
              value={parseInt(theme.frostLevel)}
              onChange={(e) => updateTheme({ frostLevel: `${e.target.value}px` })}
              className="w-full accent-blue-500"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span>Transparency</span>
              <span className="text-slate-400">{theme.transparencyLevel}</span>
            </div>
            <input
              type="range"
              min="0" max="1" step="0.05"
              value={theme.transparencyLevel}
              onChange={(e) => updateTheme({ transparencyLevel: parseFloat(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Frost Color</label>
          <div className="flex gap-2 mb-4 flex-wrap">
            {colors.map(color => (
              <button
                key={color.label}
                title={color.label}
                onClick={() => updateTheme({ frostColor: color.rgb })}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${theme.frostColor === color.rgb ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Primary Color</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map(color => (
              <button
                key={color.label}
                title={color.label}
                onClick={() => updateTheme({ primaryColor: color.hex })}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${theme.primaryColor === color.hex ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Nav Outline */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nav Outline</label>
          <div className="flex bg-slate-800 rounded-lg p-1">
            {['none', 'thin', 'thick'].map(style => (
              <button
                key={style}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${theme.navOutline === style ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
                onClick={() => updateTheme({ navOutline: style })}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Button Styles */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Button Style</label>
          
          <div className="flex bg-slate-800 rounded-lg p-1 mb-2">
            {['pill', 'rounded', 'sharp'].map(shape => (
              <button
                key={shape}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${theme.buttonShape === shape ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
                onClick={() => updateTheme({ buttonShape: shape })}
              >
                {shape}
              </button>
            ))}
          </div>
          
          <div className="flex bg-slate-800 rounded-lg p-1 mb-3">
            {['filled', 'outline', 'empty'].map(style => (
              <button
                key={style}
                className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${theme.buttonStyle === style ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'}`}
                onClick={() => updateTheme({ buttonStyle: style })}
              >
                {style}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={theme.buttonGlow}
                onChange={(e) => updateTheme({ buttonGlow: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
              />
              <span>Glow on click</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={theme.buttonJump}
                onChange={(e) => updateTheme({ buttonJump: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-blue-500 focus:ring-blue-500"
              />
              <span>Hover jump</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SettingsPanel;
