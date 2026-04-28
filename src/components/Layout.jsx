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

  return (
    <div className="relative min-h-screen selection:bg-blue-500/30 flex flex-col pt-8 pb-24">
      <DocumentHead />
      {/* Global Container Background Layer */}
      <div 
        className={`fixed inset-0 m-4 sm:m-6 lg:m-8 z-0 pointer-events-none transition-all duration-700 ${theme.layoutMode === 'container' ? 'glass-container' : ''}`}
      >
        {theme.backgroundPattern === 'mesh' && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.15] rounded-[2.5rem] overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="global-mesh" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#ffffff" strokeWidth="0.6"></path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#global-mesh)"></rect>
            </svg>
          </div>
        )}
      </div>
      
      <Header />
      
      <main className="flex-grow flex flex-col z-10 relative">
        <Hero />
        <Outlet />
      </main>
      
      <div className="mx-4 sm:mx-6 lg:mx-8 mt-16 mb-8 overflow-hidden relative z-10 glass-card">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
