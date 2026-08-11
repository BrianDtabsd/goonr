import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * Studio Look tab — shared theme grid for Glass + Foundation.
 * Glass adds Page / Accent / Panel strength instead of the old frost toybox.
 */
export default function LookEditor() {
  const {
    theme,
    updateTheme,
    applyLookPreset,
    resetTheme,
    foundationPresetList,
  } = useTheme();
  const isFoundation = theme.surfaceSystem === 'foundation';
  const mode = theme.foundationMode === 'light' ? 'light' : 'dark';

  const accentSwatches = [
    { label: 'Blue', hex: '#3b82f6' },
    { label: 'Mono white', hex: '#ffffff' },
    { label: 'Ember', hex: '#e27348' },
    { label: 'Orange', hex: '#ff6b00' },
    { label: 'Mauve', hex: '#b9a4c0' },
    { label: 'Teal', hex: '#5faba4' },
    { label: 'Ink', hex: '#75b9ea' },
    { label: 'Rose', hex: '#f43f5e' },
  ];

  const pageSwatches = [
    { label: 'Mono black', hex: '#0a0a0b' },
    { label: 'Charcoal', hex: '#111111' },
    { label: 'Ink', hex: '#0e1216' },
    { label: 'Warm dark', hex: '#161513' },
    { label: 'Paper', hex: '#f3f2ee' },
    { label: 'Cream', hex: '#f5f2ea' },
  ];

  const setMode = (nextMode) => {
    const preset =
      foundationPresetList.find((p) => p.id === theme.foundationPreset) ||
      foundationPresetList[0];
    const colors = preset[nextMode];
    updateTheme({
      foundationMode: nextMode,
      primaryColor: colors.accent,
      pageColor: colors.canvas,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Surface
        </label>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              !isFoundation ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ surfaceSystem: 'glass' })}
          >
            Glass
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              isFoundation ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ surfaceSystem: 'foundation' })}
          >
            Foundation
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">
          Same themes (fonts + accents) for both. Glass adds translucent panels;
          Foundation is matte editorial paper.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Mode
        </label>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              mode === 'light' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => setMode('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              mode === 'dark' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => setMode('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Theme
        </label>
        <div className="space-y-2">
          {foundationPresetList.map((preset) => {
            const active = theme.foundationPreset === preset.id;
            const preview = preset[mode];
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyLookPreset(preset.id)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors ${
                  active
                    ? 'border-blue-400/60 bg-blue-500/15'
                    : 'border-white/10 bg-slate-900/40 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: preset.fonts.display }}
                  >
                    {preset.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                    serif: {preset.serifScope}
                  </span>
                </div>
                <p
                  className="mt-1 text-[11px] text-slate-400 leading-snug"
                  style={{ fontFamily: preset.fonts.body }}
                >
                  {preset.blurb}
                </p>
                <div className="mt-2 flex gap-1.5">
                  {[preview.canvas, preview.surface, preview.ink, preview.accent].map(
                    (hex) => (
                      <span
                        key={`${preset.id}-${hex}`}
                        className="h-3.5 w-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Layout Mode
        </label>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              theme.layoutMode === 'cards' ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ layoutMode: 'cards' })}
          >
            {isFoundation ? 'Cards' : 'Floating Cards'}
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              theme.layoutMode === 'container'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ layoutMode: 'container' })}
          >
            {isFoundation ? 'Full page' : 'Global Container'}
          </button>
        </div>
      </div>

      {!isFoundation ? (
        <>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Page color
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {pageSwatches.map((color) => (
                <button
                  key={color.label}
                  type="button"
                  title={color.label}
                  onClick={() => updateTheme({ pageColor: color.hex })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    theme.pageColor === color.hex
                      ? 'border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <p className="text-[10px] text-slate-500">
              Background field. Picking a theme resets this to that preset&apos;s canvas.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Accent color
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {accentSwatches.map((color) => (
                <button
                  key={color.label}
                  type="button"
                  title={color.label}
                  onClick={() => updateTheme({ primaryColor: color.hex })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    theme.primaryColor === color.hex
                      ? 'border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Panel strength
            </label>
            <div className="flex justify-between mb-1 text-[11px]">
              <span className="text-slate-400">Lighter</span>
              <span className="text-slate-300">
                {Math.round((theme.panelStrength ?? 0.48) * 100)}%
              </span>
              <span className="text-slate-400">Heavier</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="1"
              step="0.05"
              value={theme.panelStrength ?? 0.48}
              onChange={(e) =>
                updateTheme({ panelStrength: parseFloat(e.target.value) })
              }
              className="w-full accent-blue-500"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              One control for glass blur + opacity on cards and nav.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Background URL
            </label>
            <input
              type="text"
              value={theme.backgroundUrl}
              onChange={(e) => updateTheme({ backgroundUrl: e.target.value })}
              onFocus={(e) => e.target.select()}
              placeholder="Optional photo under the glass"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Nav Outline
            </label>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {['none', 'thin', 'thick'].map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${
                    theme.navOutline === style
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-slate-700'
                  }`}
                  onClick={() => updateTheme({ navOutline: style })}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Button Style
            </label>
            <div className="flex bg-slate-800 rounded-lg p-1 mb-2">
              {['pill', 'rounded', 'sharp'].map((shape) => (
                <button
                  key={shape}
                  type="button"
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${
                    theme.buttonShape === shape
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-slate-700'
                  }`}
                  onClick={() => updateTheme({ buttonShape: shape })}
                >
                  {shape}
                </button>
              ))}
            </div>
            <div className="flex bg-slate-800 rounded-lg p-1 mb-3">
              {['filled', 'outline', 'empty'].map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors capitalize ${
                    theme.buttonStyle === style
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-slate-700'
                  }`}
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
                <span>Jump on hover</span>
              </label>
            </div>
          </div>
        </>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (window.confirm('Reset Look to defaults?')) resetTheme();
        }}
        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-wider text-slate-200 hover:bg-white/10"
      >
        Restore look defaults
      </button>
    </div>
  );
}
