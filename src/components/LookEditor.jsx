import React from 'react';
import { defaultTheme, useTheme } from '../hooks/useTheme';

const accentSwatches = [
  ['Blue', '#3b82f6'], ['Mono white', '#ffffff'], ['Ember', '#e27348'],
  ['Orange', '#ff6b00'], ['Mauve', '#b9a4c0'], ['Teal', '#5faba4'],
  ['Ink', '#75b9ea'], ['Rose', '#f43f5e'],
];
const pageSwatches = [
  ['Mono black', '#0a0a0b'], ['Charcoal', '#111111'], ['Ink', '#0e1216'],
  ['Warm dark', '#161513'], ['Paper', '#f3f2ee'], ['Cream', '#f5f2ea'],
];
const tintSwatches = [
  ['Slate', '22, 22, 24'], ['Paper', '255, 255, 255'], ['Warm', '42, 35, 31'],
  ['Ink', '20, 30, 40'], ['Mauve', '54, 46, 58'],
];

function Group({ title, children, customized, resetPresetGroup, id }) {
  return (
    <details className="studio-section" open>
      <summary className="studio-section__summary">
        <span>{title}</span>
        <span className="studio-section__meta">
          {customized ? <b className="studio-custom-badge">Custom</b> : null}
          {customized ? (
            <button type="button" className="studio-reset-link" onClick={(event) => {
              event.preventDefault();
              resetPresetGroup(id);
            }}>Reset</button>
          ) : null}
          <span className="studio-chevron">⌄</span>
        </span>
      </summary>
      <div className="studio-section__body">{children}</div>
    </details>
  );
}

function Row({ label, hint, children }) {
  return (
    <div className="studio-control-row">
      <div className="studio-control-label">
        <span>{label}</span>
        {hint ? <small>{hint}</small> : null}
      </div>
      <div className="studio-control">{children}</div>
    </div>
  );
}

function Segmented({ value, options, onChange }) {
  return (
    <div className="studio-segmented">
      {options.map(([option, label = option]) => (
        <button key={option} type="button" className={value === option ? 'is-active' : ''} onClick={() => onChange(option)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Swatches({ value, options, onChange }) {
  return (
    <div className="studio-swatches">
      {options.map(([label, color]) => (
        <button
          key={label}
          type="button"
          title={label}
          aria-label={label}
          className={value === color ? 'is-active' : ''}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}

export default function LookEditor() {
  const {
    theme,
    updateTheme,
    applyLookPreset,
    setFoundationMode,
    resetPresetGroup,
    resetTheme,
    foundationPresetList,
  } = useTheme();
  const mode = theme.foundationMode === 'light' ? 'light' : 'dark';
  const isFoundation = theme.surfaceSystem === 'foundation';
  const defaultSurfaceGeometry = {
    cardPadding: '1.5rem',
    cardRadius: isFoundation ? '0.5rem' : '1.25rem',
  };
  const baselineChanged = (keys, defaults = defaultTheme) => keys.some((key) => (
    theme[key] !== defaults[key]
  ));
  const presetOwnedChanged = (keys) => keys.some((key) => theme.customOverrides?.[key]);
  const groupCustomized = {
    theme: false,
    mode: false,
    layout: false,
    surface: presetOwnedChanged(['surfaceOpacity', 'frostLevel', 'frostColor', 'navOpacity'])
      || baselineChanged(['panelStrength'])
      || baselineChanged(['cardPadding', 'cardRadius'], defaultSurfaceGeometry),
    typography: baselineChanged(['typographyPreset', 'bodyTextSize']),
    colour: presetOwnedChanged(['pageColor', 'primaryColor']),
    buttons: baselineChanged(['buttonShape', 'buttonStyle', 'buttonGlow', 'buttonJump']),
    navigation: baselineChanged(['navOutline', 'navOutlineColor']),
    background: baselineChanged(['backgroundUrl', 'backgroundPattern']),
  };
  const surfaceOpacity = Number.isFinite(Number(theme.surfaceOpacity))
    ? Number(theme.surfaceOpacity)
    : Number(theme.panelStrength ?? 0.48);
  const frostValue = parseFloat(theme.frostLevel) || 0;
  const navOpacity = Number.isFinite(Number(theme.navOpacity)) ? Number(theme.navOpacity) : 0.616;

  return (
    <div className="studio-look">
      <Group id="theme" title="Theme preset" customized={groupCustomized.theme} resetPresetGroup={resetPresetGroup}>
        <div className="studio-preset-grid">
          {foundationPresetList.map((preset) => {
            const active = theme.foundationPreset === preset.id;
            const preview = preset[mode];
            return (
              <button key={preset.id} type="button" onClick={() => applyLookPreset(preset.id)} className={`studio-preset ${active ? 'is-active' : ''}`}>
                <span className="studio-preset__top">
                  <strong style={{ fontFamily: preset.fonts.display }}>{preset.name}</strong>
                  <small>{preset.serifScope}</small>
                </span>
                <span className="studio-preset__blurb">{preset.blurb}</span>
                <span className="studio-preset__swatches">
                  {[preview.canvas, preview.surface, preview.ink, preview.accent].map((color) => <i key={`${preset.id}-${color}`} style={{ backgroundColor: color }} />)}
                </span>
              </button>
            );
          })}
        </div>
      </Group>

      <Group id="mode" title="Mode" customized={groupCustomized.mode} resetPresetGroup={resetPresetGroup}>
        <Row label="Surface system">
          <Segmented value={isFoundation ? 'foundation' : 'glass'} options={[['glass', 'Glass'], ['foundation', 'Foundation']]} onChange={(surfaceSystem) => updateTheme({ surfaceSystem })} />
        </Row>
        <Row label="Colour mode">
          <Segmented value={mode} options={[['light', 'Light'], ['dark', 'Dark']]} onChange={setFoundationMode} />
        </Row>
      </Group>

      <Group id="layout" title="Layout" customized={groupCustomized.layout} resetPresetGroup={resetPresetGroup}>
        <Row label="Content layout" hint="How sections sit on the page">
          <Segmented value={theme.layoutMode} options={[['cards', isFoundation ? 'Cards' : 'Floating cards'], ['container', isFoundation ? 'Full page' : 'Global container']]} onChange={(layoutMode) => updateTheme({ layoutMode })} />
        </Row>
      </Group>

      <Group id="surface" title="Surface & depth" customized={groupCustomized.surface} resetPresetGroup={resetPresetGroup}>
        <Row label="Quick strength" hint="Updates opacity, frost and nav together">
          <div className="studio-range">
            <input type="range" min="0" max="1" step="0.01" value={theme.panelStrength ?? 0.48} onChange={(event) => updateTheme({ panelStrength: Number(event.target.value) })} />
            <output>{Math.round((theme.panelStrength ?? 0.48) * 100)}%</output>
          </div>
        </Row>
        <Row label="Surface opacity" hint="Card and container fill">
          <div className="studio-range">
            <input type="range" min="0" max="1" step="0.01" value={surfaceOpacity} onChange={(event) => updateTheme({ surfaceOpacity: Number(event.target.value) })} />
            <output>{Math.round(surfaceOpacity * 100)}%</output>
          </div>
        </Row>
        <Row label="Frost" hint="Backdrop blur, independent of opacity">
          <div className="studio-range">
            <input type="range" min="0" max="48" step="1" value={frostValue} onChange={(event) => updateTheme({ frostLevel: `${event.target.value}px` })} />
            <output>{Math.round(frostValue)}px</output>
          </div>
        </Row>
        <Row label="Nav opacity">
          <div className="studio-range">
            <input type="range" min="0" max="1" step="0.01" value={navOpacity} onChange={(event) => updateTheme({ navOpacity: Number(event.target.value) })} />
            <output>{Math.round(navOpacity * 100)}%</output>
          </div>
        </Row>
        <Row label="Surface tint">
          <Swatches value={theme.frostColor} options={tintSwatches} onChange={(frostColor) => updateTheme({ frostColor })} />
        </Row>
        <Row label="Card padding"><Segmented value={theme.cardPadding} options={[['1rem', 'S'], ['1.5rem', 'M'], ['2rem', 'L']]} onChange={(cardPadding) => updateTheme({ cardPadding })} /></Row>
        <Row label="Card radius"><Segmented value={theme.cardRadius} options={[['0.5rem', 'S'], ['1.25rem', 'M'], ['1.5rem', 'L']]} onChange={(cardRadius) => updateTheme({ cardRadius })} /></Row>
      </Group>

      <Group id="typography" title="Typography" customized={groupCustomized.typography} resetPresetGroup={resetPresetGroup}>
        <Row label="Body size">
          <Segmented value={theme.bodyTextSize} options={[['14px', '14'], ['16px', '16'], ['18px', '18']]} onChange={(bodyTextSize) => updateTheme({ bodyTextSize })} />
        </Row>
        <Row label="Legacy type bundle">
          <select value={theme.typographyPreset} onChange={(event) => updateTheme({ typographyPreset: event.target.value })}>
            {['modern', 'elegant', 'tech'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </Row>
      </Group>

      <Group id="colour" title="Colour" customized={groupCustomized.colour} resetPresetGroup={resetPresetGroup}>
        <Row label="Page colour"><Swatches value={theme.pageColor} options={pageSwatches} onChange={(pageColor) => updateTheme({ pageColor })} /></Row>
        <Row label="Accent"><Swatches value={theme.primaryColor} options={accentSwatches} onChange={(primaryColor) => updateTheme({ primaryColor })} /></Row>
      </Group>

      <Group id="buttons" title="Buttons" customized={groupCustomized.buttons} resetPresetGroup={resetPresetGroup}>
        <Row label="Shape"><Segmented value={theme.buttonShape} options={['pill', 'rounded', 'sharp'].map((value) => [value])} onChange={(buttonShape) => updateTheme({ buttonShape })} /></Row>
        <Row label="Style"><Segmented value={theme.buttonStyle} options={['filled', 'outline', 'empty'].map((value) => [value])} onChange={(buttonStyle) => updateTheme({ buttonStyle })} /></Row>
        <Row label="Interaction">
          <div className="studio-checks">
            <label><input type="checkbox" checked={theme.buttonGlow} onChange={(event) => updateTheme({ buttonGlow: event.target.checked })} /> Glow</label>
            <label><input type="checkbox" checked={theme.buttonJump} onChange={(event) => updateTheme({ buttonJump: event.target.checked })} /> Jump</label>
          </div>
        </Row>
      </Group>

      <Group id="navigation" title="Navigation" customized={groupCustomized.navigation} resetPresetGroup={resetPresetGroup}>
        <Row label="Outline"><Segmented value={theme.navOutline} options={['none', 'thin', 'thick'].map((value) => [value])} onChange={(navOutline) => updateTheme({ navOutline })} /></Row>
        <Row label="Outline colour"><input type="text" value={theme.navOutlineColor} onChange={(event) => updateTheme({ navOutlineColor: event.target.value })} /></Row>
      </Group>

      <Group id="background" title="Background" customized={groupCustomized.background} resetPresetGroup={resetPresetGroup}>
        <Row label="Image URL"><input type="text" value={theme.backgroundUrl} onChange={(event) => updateTheme({ backgroundUrl: event.target.value })} placeholder="Optional image URL" /></Row>
        <Row label="Pattern"><Segmented value={theme.backgroundPattern} options={[['none', 'None'], ['mesh', 'Mesh']]} onChange={(backgroundPattern) => updateTheme({ backgroundPattern })} /></Row>
      </Group>

      <button type="button" className="studio-reset-all" onClick={() => { if (window.confirm('Reset Look to defaults?')) resetTheme(); }}>
        Restore look defaults
      </button>
    </div>
  );
}
