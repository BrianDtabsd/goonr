import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { defaultTheme, useTheme } from '../../hooks/useTheme';
import {
  documindGlassCasefile,
  documindGlassDashboard,
} from '../../lib/glassPresets';
import GlassSidebar from '../../components/glass/GlassSidebar';

export default function GlassAppLayout() {
  const { pathname } = useLocation();
  const { theme, updateTheme } = useTheme();
  const isCaseDetail =
    pathname.includes('/app/glass/cases/') && pathname.split('/').length > 4;

  useEffect(() => {
    const preset = isCaseDetail ? documindGlassCasefile : documindGlassDashboard;
    updateTheme(preset);
    return () => updateTheme(defaultTheme);
  }, [isCaseDetail, updateTheme]);

  return (
    <div className="relative min-h-screen pb-12">
      <div
        className={`fixed inset-0 m-4 sm:m-6 lg:m-8 z-0 pointer-events-none transition-all duration-700 ${
          theme.layoutMode === 'container' ? 'glass-container' : ''
        }`}
      >
        {theme.backgroundPattern === 'mesh' && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.12] rounded-[2.5rem] overflow-hidden">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="glass-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#ffffff" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#glass-mesh)" />
            </svg>
          </div>
        )}
      </div>

      <GlassSidebar />

      <main className="relative z-10 ml-[252px] mr-4 mt-4 sm:mr-6 lg:mr-8">
        <Outlet />
      </main>
    </div>
  );
}
