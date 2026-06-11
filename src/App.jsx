import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { TemplateContentProvider } from './hooks/useTemplateContent';
import { VisibilityProvider, useVisibility } from './hooks/useVisibility';
import { StripeEmbeddedCheckoutProvider } from './context/StripeEmbeddedCheckoutContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Blog from './pages/Blog';
import Sales from './pages/Sales';
import SellerOnboarding from './pages/SellerOnboarding';
import SettingsPanel from './components/SettingsPanel';
import { isStudioMode } from './lib/studioMode';
import CaseAppLayout from './pages/caseapp/CaseAppLayout';
import DecisionCenter from './pages/caseapp/DecisionCenter';
import Analysis from './pages/caseapp/Analysis';
import CaseList from './pages/caseapp/CaseList';
import CaseFileDetail from './pages/caseapp/CaseFileDetail';
import PlaceholderPage from './pages/caseapp/PlaceholderPage';
import DesignTracks from './pages/caseapp/DesignTracks';
import GlassAppLayout from './pages/glass/GlassAppLayout';
import GlassDashboard from './pages/glass/GlassDashboard';
import GlassCaseList from './pages/glass/GlassCaseList';
import GlassCaseFile from './pages/glass/GlassCaseFile';

function AppRoutes() {
  const studio = isStudioMode();
  const { isPageVisible } = useVisibility();

  return (
    <Routes>
      <Route path="/app/glass" element={<GlassAppLayout />}>
        <Route index element={<GlassDashboard />} />
        <Route path="cases" element={<GlassCaseList />} />
        <Route path="cases/:caseId" element={<GlassCaseFile />} />
      </Route>
      <Route path="/app" element={<CaseAppLayout />}>
        <Route path="tracks" element={<DesignTracks />} />
        <Route index element={<DecisionCenter />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="cases" element={<CaseList />} />
        <Route path="cases/:caseId" element={<CaseFileDetail />} />
        <Route path="incidents" element={<PlaceholderPage title="Incidents" section="incidents" />} />
        <Route path="decisions" element={<PlaceholderPage title="Decisions" section="decisions" />} />
        <Route path="people" element={<PlaceholderPage title="People" section="people" />} />
        <Route path="evidence" element={<PlaceholderPage title="Evidence" section="evidence" />} />
        <Route path="reports" element={<PlaceholderPage title="Reports" section="reports" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" section="settings" />} />
      </Route>
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

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TemplateContentProvider>
          <VisibilityProvider>
            <StripeEmbeddedCheckoutProvider>
              <AppRoutes />
              <SettingsPanel />
            </StripeEmbeddedCheckoutProvider>
          </VisibilityProvider>
        </TemplateContentProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
