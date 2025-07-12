import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
import { Home } from "./pages/Home";
import { TranslationsProvider } from "./localization/TranslationsProvider";
import { QueryProvider } from "./state/remote/QueryProvider";
import ErrorBoundary from "./components/organisms/error/ErrorBoundary";

export const App: React.FC = () => (
  <ErrorBoundary>
    <QueryProvider>
      <TranslationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </TranslationsProvider>
    </QueryProvider>
  </ErrorBoundary>
);
