/**
 * Branding for the case management app (/app/*).
 * Override per deploy via VITE_CASE_APP_* env vars.
 */

export function getCaseAppMeta() {
  const brandName =
    import.meta.env.VITE_CASE_APP_BRAND_NAME?.trim() || 'DocuMind cms';
  const breadcrumbPrefix =
    import.meta.env.VITE_CASE_APP_BREADCRUMB_PREFIX?.trim() || 'documind cms';

  return {
    brandName,
    breadcrumbPrefix,
    designSystemTitle: 'DocuMind CMS Design System',
  };
}

/** e.g. "documind cms / dashboard" → rendered uppercase via .ds-breadcrumb */
export function caseAppBreadcrumb(section) {
  const { breadcrumbPrefix } = getCaseAppMeta();
  return `${breadcrumbPrefix} / ${section}`;
}
