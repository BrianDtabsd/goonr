import React from 'react';
import { Outlet } from 'react-router-dom';
import DocumentHead from '../components/DocumentHead';
import DesignSystemNav from '../components/design-system/DesignSystemNav';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';

export default function DesignSystemLayout() {
  useScrollReveal();
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen pb-12">
      <DocumentHead title="Design System — DocuMind cms" />

      <div
        className={`fixed inset-0 m-4 sm:m-6 lg:m-8 z-0 pointer-events-none transition-all duration-700 ${
          theme.layoutMode === 'container' ? 'glass-container' : ''
        }`}
      >
        {theme.backgroundPattern === 'mesh' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] opacity-[0.12]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ds-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#ffffff" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ds-mesh)" />
            </svg>
          </div>
        )}
      </div>

      <DesignSystemNav />

      <main className="relative z-10 ml-[272px] mr-4 mt-4 sm:mr-6 lg:mr-8">
        <Outlet />
      </main>
    </div>
  );
}
