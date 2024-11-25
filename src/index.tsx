// cra imports
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// import reportWebVitals from 'reportWebVitals';

// import redux requirements
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './store';

// import html head tags requirements
import { Helmet } from 'react-helmet';
import { REACT_HELMET_PROPS } from './config';

// import multi language
import LangProvider from './lang/LangProvider';

// import routing modules
import { BrowserRouter } from 'react-router-dom';
import RouteIdentifier from './routing/components/RouteIdentifier';
import Loading from './components/loading/Loading';

// import routes
import { getLayoutlessRoutes } from './routing/helper';
import defaultRoutes from './routing/default-routes';
import routesAndMenuItems from './routes';

// import toastify for notification
import { Slide, ToastContainer } from 'react-toastify';

// mock server register for demo
import './@mock-api';
import { RouteItemProps } from './routing/protocols/RouteIdentifier';
import { useAuth } from './pages/Auth/Login/hook';
import { notEmpty } from './helpers/Utils';
import { Role } from './pages/Auth/Login/hook/types';


// import * as Sentry from "@sentry/react";

// Sentry.init({
//   dsn: "https://74ee1e6434a276de3991827f442b75b0@o556785.ingest.us.sentry.io/4506867816529920",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false,
//     }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

const Main = () => {
  const [routes, setRoutes] = useState<RouteItemProps[]>(defaultRoutes);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isLoggedIn = useAuth(sate => sate.isLoggedIn);
  const user = useAuth(sate => sate.user);

  useEffect(() => {
    const fetchRoutesAndAuth = async () => {
      try {
        const layoutRoutes = (await getLayoutlessRoutes({ data: routesAndMenuItems, user })).flat().flat();

        const routes = defaultRoutes.map((route) => {

          if (route.path === '/') return route;

          const subRoutes = layoutRoutes.filter((subRoute) => subRoute?.path?.includes(String(route.path)));

          if (subRoutes) {
            return {
              ...route,
              subs: subRoutes.filter(notEmpty),
            };
          }

          return route;
        });

        setRoutes(routes);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoutesAndAuth();
  }, [isLoggedIn]);

  if (isLoading) {
    return <Loading />; // Render loading state
  }

  if (error) {
    // Handle error appropriately, e.g., display an error message
    return (
      <div>
        <h1>An error occurred:</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistedStore}>
        <Helmet {...REACT_HELMET_PROPS} />
        <ToastContainer transition={Slide} newestOnTop />
        <BrowserRouter>
          <LangProvider>
            <RouteIdentifier routes={routes} fallback={<Loading />} isLogged={isLoggedIn} />
          </LangProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

const container = document.getElementById('root');

if (!container) throw new Error('No container found');

const root = createRoot(container);
root.render(<Main />);

// reportWebVitals(() => {});
