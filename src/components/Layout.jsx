import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import DocumentHead from '../components/DocumentHead';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTheme } from '../hooks/useTheme';

function Layout() {
  useScrollReveal();
  const { theme } = useTheme();
  const isContainer = theme.layoutMode === 'container';

  return (
    <div className="relative min-h-screen flex flex-col">
      <DocumentHead />

      {/* Ambient layers sit under the full-page surface */}
      <div className="site-ambiance" aria-hidden="true" />

      {/*
        Global Container = full-bleed page surface (no edge gutters).
        Cards mode leaves this inert so floating cards sit on the ambient field.
      */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-all duration-700 ${
          isContainer ? 'glass-container' : ''
        }`}
        aria-hidden="true"
      >
        {isContainer && theme.backgroundPattern === 'mesh' && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="global-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path
                    d="M 56 0 L 0 0 0 56"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.6"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#global-mesh)" />
            </svg>
          </div>
        )}
      </div>

      <Header />

      <main
        className="flex-grow flex flex-col z-10 relative"
        style={{ paddingTop: 'var(--header-offset)' }}
      >
        <Hero />
        <Outlet />
      </main>

      <div
        className="mt-16 mb-0 overflow-hidden relative z-10 glass-card"
        style={{
          marginLeft: 'var(--shell-inset)',
          marginRight: 'var(--shell-inset)',
          marginBottom: 'var(--shell-inset)',
          borderBottomLeftRadius: isContainer ? '1.25rem' : undefined,
          borderBottomRightRadius: isContainer ? '1.25rem' : undefined,
        }}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
