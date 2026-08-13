import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { TemplateContentProvider } from './hooks/useTemplateContent';
import { SiteMetaProvider } from './hooks/useSiteMeta';
import { VisibilityProvider, useVisibility } from './hooks/useVisibility';
import { StudioShellProvider, useStudioShell } from './hooks/useStudioShell';
import { StripeEmbeddedCheckoutProvider } from './context/StripeEmbeddedCheckoutContext';
import {
  ScrollContainerProvider,
  useScrollContainer,
} from './context/ScrollContainerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Sales from './pages/Sales';
import SellerOnboarding from './pages/SellerOnboarding';
import SettingsPanel from './components/SettingsPanel';
import { isStudioMode } from './lib/studioMode';

function AppRoutes() {
  const studio = isStudioMode();
  const { isPageVisible } = useVisibility();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {isPageVisible('store') ? <Route path="store" element={<Store />} /> : null}
        {isPageVisible('checkout') ? <Route path="checkout" element={<Checkout />} /> : null}
        {isPageVisible('learn') ? <Route path="learn" element={<Blog />} /> : null}
        {isPageVisible('learn') ? (
          <Route path="blog" element={<Navigate to="/learn" replace />} />
        ) : null}
        {isPageVisible('sales') ? <Route path="sales" element={<Sales />} /> : null}
        {studio ? (
          <Route path="seller-onboarding" element={<SellerOnboarding />} />
        ) : null}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function StudioSplitShell({ children }) {
  const studioEnabled = isStudioMode();
  const { isOpen, panelWidth, sheetHeight, isDragging } = useStudioShell();
  const { setScrollElement } = useScrollContainer();

  return (
    <div
      className={`studio-split ${studioEnabled ? '' : 'is-site-only'} ${
        isOpen ? 'is-open' : ''
      } ${isDragging ? 'is-dragging' : ''}`}
      style={{ '--studio-sheet-height': `${sheetHeight}px` }}
    >
      <div
        className="studio-site-pane"
        ref={setScrollElement}
        style={
          isOpen
            ? { width: `calc(100% - ${panelWidth}px)`, maxWidth: `calc(100% - ${panelWidth}px)` }
            : undefined
        }
      >
        {children}
      </div>
      {studioEnabled ? <SettingsPanel /> : null}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SiteMetaProvider>
          <TemplateContentProvider>
            <VisibilityProvider>
              <StudioShellProvider>
                <StripeEmbeddedCheckoutProvider>
                  <ScrollContainerProvider>
                    <StudioSplitShell>
                      <AppRoutes />
                    </StudioSplitShell>
                  </ScrollContainerProvider>
                </StripeEmbeddedCheckoutProvider>
              </StudioShellProvider>
            </VisibilityProvider>
          </TemplateContentProvider>
        </SiteMetaProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
