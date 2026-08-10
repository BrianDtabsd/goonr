import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useSiteMeta } from '../hooks/useSiteMeta';
import TemplateContentEditor, { TextField } from './TemplateContentEditor';
import SetupGuide from './SetupGuide';
import VisibilityEditor from './VisibilityEditor';
import { isStudioMode } from '../lib/studioMode';

const TABS = [
  { id: 'setup', label: 'Setup' },
  { id: 'brand', label: 'Brand' },
  { id: 'pages', label: 'Pages' },
  { id: 'copy', label: 'Copy' },
  { id: 'look', label: 'Look' },
];

function BrandEditor() {
  const {
    brandName,
    documentTitle,
    metaDescription,
    footerBlurb,
    defaults,
    lockedByEnv,
    patchSiteMeta,
    resetSiteMetaOverrides,
  } = useSiteMeta();

  return (
    <div className="space-y-3">
      <p className="text-[11px] leading-relaxed text-slate-500">
        Preview branding in the browser. Env vars (
        <code className="text-slate-400">VITE_SITE_*</code>) win on deploy when set.
        Click a sample field to select all, then type to replace.
      </p>

      <TextField
        label="Brand name"
        value={brandName}
        baseValue={defaults.brandName}
        disabled={lockedByEnv.brandName}
        onChange={(v) => patchSiteMeta({ brandName: v })}
      />
      {lockedByEnv.brandName ? (
        <p className="text-[10px] text-amber-300/80 -mt-2 mb-2">
          Locked by VITE_SITE_BRAND_NAME
        </p>
      ) : null}

      <TextField
        label="Document title"
        value={documentTitle}
        baseValue={defaults.documentTitle}
        disabled={lockedByEnv.documentTitle}
        onChange={(v) => patchSiteMeta({ documentTitle: v })}
      />
      {lockedByEnv.documentTitle ? (
        <p className="text-[10px] text-amber-300/80 -mt-2 mb-2">
          Locked by VITE_SITE_TITLE
        </p>
      ) : null}

      <TextField
        label="Meta description"
        value={metaDescription}
        baseValue={defaults.metaDescription}
        disabled={lockedByEnv.metaDescription}
        onChange={(v) => patchSiteMeta({ metaDescription: v })}
        rows={3}
      />
      {lockedByEnv.metaDescription ? (
        <p className="text-[10px] text-amber-300/80 -mt-2 mb-2">
          Locked by VITE_SITE_META_DESCRIPTION
        </p>
      ) : null}

      <TextField
        label="Footer blurb"
        value={footerBlurb}
        baseValue={defaults.footerBlurb}
        disabled={lockedByEnv.footerBlurb}
        onChange={(v) => patchSiteMeta({ footerBlurb: v })}
        rows={3}
      />
      {lockedByEnv.footerBlurb ? (
        <p className="text-[10px] text-amber-300/80 -mt-2 mb-2">
          Locked by VITE_SITE_FOOTER_BLURB
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => {
          if (window.confirm('Reset Studio brand overrides to template defaults?')) {
            resetSiteMetaOverrides();
          }
        }}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-slate-200 hover:bg-white/10"
      >
        Restore brand defaults
      </button>
    </div>
  );
}

function LookEditor() {
  const { theme, updateTheme, resetTheme, typographyBundles } = useTheme();

  const colors = [
    { label: 'Orange', hex: '#ff6b00', rgb: '255, 107, 0' },
    { label: 'White', hex: '#ffffff', rgb: '255, 255, 255' },
    { label: 'Charcoal', hex: '#161618', rgb: '22, 22, 24' },
    { label: 'Black', hex: '#000000', rgb: '0, 0, 0' },
    { label: 'Blue', hex: '#3b82f6', rgb: '59, 130, 246' },
    { label: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
    { label: 'Rose', hex: '#f43f5e', rgb: '244, 63, 94' },
    { label: 'Amber', hex: '#f59e0b', rgb: '245, 158, 11' },
  ];

  return (
    <div className="space-y-6">
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
              Floating Cards
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
              Global Container
            </button>
          </div>
          <p className="mt-2 text-[10px] text-slate-500 leading-relaxed">
            Floating Cards: panels sit on the ambient field. Global Container: full-page surface
            (edge-to-edge) with quieter cards.
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
          placeholder="Leave blank for layered dark field"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-1"
        />
        <p className="text-[10px] text-slate-500 mb-4">
          Blank keeps the fancy charcoal layers + accent glow. Paste an image URL to layer a photo underneath.
        </p>

        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Background Pattern
        </label>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              theme.backgroundPattern === 'none'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ backgroundPattern: 'none' })}
          >
            None
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 px-3 rounded-md transition-colors ${
              theme.backgroundPattern === 'mesh'
                ? 'bg-blue-500 text-white'
                : 'hover:bg-slate-700'
            }`}
            onClick={() => updateTheme({ backgroundPattern: 'mesh' })}
          >
            Mesh Grid
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Typography Bundle
        </label>
        <select
          value={theme.typographyPreset}
          onChange={(e) => updateTheme({ typographyPreset: e.target.value })}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 mb-2"
        >
          {Object.entries(typographyBundles).map(([key, bundle]) => (
            <option key={key} value={key}>
              {bundle.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Glass Effect
        </label>

        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span>Frost Level (Blur)</span>
            <span className="text-slate-400">{theme.frostLevel}</span>
          </div>
          <input
            type="range"
            min="0"
            max="64"
            value={parseInt(theme.frostLevel, 10) || 0}
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
            min="0"
            max="1"
            step="0.05"
            value={theme.transparencyLevel}
            onChange={(e) =>
              updateTheme({ transparencyLevel: parseFloat(e.target.value) })
            }
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Frost Color
        </label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {colors.map((color) => (
            <button
              key={color.label}
              type="button"
              title={color.label}
              onClick={() => updateTheme({ frostColor: color.rgb })}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                theme.frostColor === color.rgb
                  ? 'border-white scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Primary Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
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
            <span>Hover jump</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm('Reset Look theme to ShopSite defaults?')) {
            resetTheme();
          }
        }}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-wider text-slate-200 hover:bg-white/10"
      >
        Restore look defaults
      </button>
    </div>
  );
}

function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('setup');

  if (!isStudioMode()) return null;

  if (!isOpen) {
    return (
      <div id="settings-panel">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
          aria-label="Open Studio"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      id="settings-panel"
      className="fixed top-0 right-0 bottom-0 z-50 flex w-[min(36rem,calc(100vw-0.5rem))] flex-col border-l border-white/10 bg-black/85 text-sm text-slate-200 shadow-2xl backdrop-blur-xl"
      contentEditable="false"
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-white">ShopSite Studio</h2>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Setup · brand · pages · copy · look
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white"
          aria-label="Close Studio"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="shrink-0 flex gap-1 overflow-x-auto border-b border-white/10 px-3 py-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
              tab === t.id
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        {tab === 'setup' ? <SetupGuide embedded /> : null}
        {tab === 'brand' ? <BrandEditor /> : null}
        {tab === 'pages' ? <VisibilityEditor embedded /> : null}
        {tab === 'copy' ? <TemplateContentEditor embedded /> : null}
        {tab === 'look' ? <LookEditor /> : null}
      </div>
    </div>
  );
}

export default SettingsPanel;
