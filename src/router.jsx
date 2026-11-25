import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PageLoader from './components/ui/PageLoader';

// Inner pages are code-split; Home and NotFound stay in the main bundle.
const lazyPage = (loader) => async () => ({
  Component: (await loader()).default,
});

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: PageLoader,
    children: [
      { index: true, Component: Home },
      { path: 'goals', lazy: lazyPage(() => import('./pages/Goals')) },
      { path: 'calculator', lazy: lazyPage(() => import('./pages/Calculator')) },
      { path: 'compare', lazy: lazyPage(() => import('./pages/Compare')) },
      { path: 'tax-benefits', lazy: lazyPage(() => import('./pages/TaxBenefits')) },
      { path: 'faq', lazy: lazyPage(() => import('./pages/Faq')) },
      { path: 'schemes/:schemeId', lazy: lazyPage(() => import('./pages/SchemeDetail')) },
      { path: '*', Component: NotFound },
    ],
  },
]);
