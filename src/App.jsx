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

function AppRoutes() {
  const studio = isStudioMode();
  const { isPageVisible } = useVisibility();

  return (
    <Routes>
      <Route path="/app" element={<CaseAppLayout />}>
        <Route index element={<DecisionCenter />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="cases" element={<CaseList />} />
        <Route path="cases/:caseId" element={<CaseFileDetail />} />
        <Route path="incidents" element={<PlaceholderPage title="Incidents" breadcrumb="caselogic core / incidents" />} />
        <Route path="decisions" element={<PlaceholderPage title="Decisions" breadcrumb="caselogic core / decisions" />} />
        <Route path="people" element={<PlaceholderPage title="People" breadcrumb="caselogic core / people" />} />
        <Route path="evidence" element={<PlaceholderPage title="Evidence" breadcrumb="caselogic core / evidence" />} />
        <Route path="reports" element={<PlaceholderPage title="Reports" breadcrumb="caselogic core / reports" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" breadcrumb="caselogic core / settings" />} />
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
