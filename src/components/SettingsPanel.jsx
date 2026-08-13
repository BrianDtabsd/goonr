import React, { useRef, useState } from 'react';
import { useSiteMeta } from '../hooks/useSiteMeta';
import { useStudioShell } from '../hooks/useStudioShell';
import TemplateContentEditor, { TextField } from './TemplateContentEditor';
import SetupGuide from './SetupGuide';
import VisibilityEditor from './VisibilityEditor';
import { isStudioMode } from '../lib/studioMode';
import LookEditor from './LookEditor';

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

function SettingsPanel() {
  const [tab, setTab] = useState('look');
  const {
    isOpen,
    openStudio,
    closeStudio,
    panelWidth,
    beginResize,
    toggleSheet,
    resizeSheet,
    endSheetResize,
    isSheetExpanded,
    isDragging,
  } = useStudioShell();
  const sheetInteraction = useRef(null);

  if (!isStudioMode()) return null;

  if (!isOpen) {
    return (
      <div id="settings-panel">
        <button
          type="button"
          onClick={openStudio}
          className="fixed bottom-6 right-6 z-[80] bg-sky-600 hover:bg-sky-500 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
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
    <>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize Studio"
        title="Drag to resize"
        onPointerDown={(e) => {
          e.preventDefault();
          if (window.matchMedia('(max-width: 900px)').matches) {
            sheetInteraction.current = {
              pointerId: e.pointerId,
              startY: e.clientY,
              moved: false,
            };
            e.currentTarget.setPointerCapture(e.pointerId);
          } else {
            beginResize(e.clientX);
          }
        }}
        onPointerMove={(e) => {
          const interaction = sheetInteraction.current;
          if (!interaction || interaction.pointerId !== e.pointerId) return;
          if (Math.abs(e.clientY - interaction.startY) > 5) {
            interaction.moved = true;
            resizeSheet(window.innerHeight - e.clientY);
          }
        }}
        onPointerUp={(e) => {
          const interaction = sheetInteraction.current;
          if (!interaction || interaction.pointerId !== e.pointerId) return;
          if (!interaction.moved) toggleSheet();
          endSheetResize();
          sheetInteraction.current = null;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        onPointerCancel={() => {
          sheetInteraction.current = null;
          endSheetResize();
        }}
        className={`studio-resize-handle ${isDragging ? 'is-dragging' : ''}`}
      />
      <aside
        id="settings-panel"
        className={`studio-panel ${isSheetExpanded ? 'is-sheet-expanded' : ''}`}
        style={{ width: panelWidth }}
        contentEditable={false}
      >
        <div className="studio-panel__header">
          <div>
            <div className="studio-panel__eyebrow">
              <span className="studio-panel__status" />
              LIVE PREVIEW
            </div>
            <h2 className="studio-panel__title">ShopSite Studio</h2>
            <p className="studio-panel__sub">Edit live · drag the edge to resize</p>
          </div>
          <button
            type="button"
            onClick={closeStudio}
            className="studio-icon-btn"
            aria-label="Close Studio"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="studio-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`studio-tab ${tab === t.id ? 'is-active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="studio-panel__body">
          {tab === 'setup' ? <SetupGuide embedded /> : null}
          {tab === 'brand' ? <BrandEditor /> : null}
          {tab === 'pages' ? <VisibilityEditor embedded /> : null}
          {tab === 'copy' ? <TemplateContentEditor embedded /> : null}
          {tab === 'look' ? <LookEditor /> : null}
        </div>
      </aside>
    </>
  );
}

export default SettingsPanel;
