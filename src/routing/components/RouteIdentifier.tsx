import React, { ReactElement, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { RouteIdentifierProps, RouteItemProps } from '../../routing/protocols/RouteIdentifier';
import { DEFAULT_PATHS } from '../../config';


const renderRoutes = (routes: RouteItemProps[], isLoggedIn: boolean): ReactElement[] => {
  return routes.map((route: RouteItemProps, index: number) => {
    if (route.hideInRoute) {
      return <React.Fragment key={route.path + index} />;
    } else if (route.redirect) {
      return <Route path={route.path} element={<Navigate to={route.to ?? DEFAULT_PATHS.NOTFOUND} replace />} key={route.path + index} />;
    } else {
      const RouteElement = route.component ? <route.component /> : <Outlet />;
      const ProtectedRouteElement = route.protected && !isLoggedIn ? <Navigate to="/login" replace /> : <Suspense>{RouteElement}</Suspense>;

      return (
        <React.Fragment key={route.path + index}>
        {
          route.index ? (
            <Route element={ProtectedRouteElement} index={true}></Route>
          ) : null
        }
        <Route path={route.path} element={ProtectedRouteElement} >
          {route.subs ? renderRoutes(route.subs, isLoggedIn) : null}
        </Route>
        </React.Fragment>
      );
    }
  });
};

const RouteIdentifier = ({ routes, fallback = <div className="loading" />, notFoundPath = DEFAULT_PATHS.NOTFOUND, isLogged }: RouteIdentifierProps) => {
  return (
    <Suspense fallback={fallback}>
      <Routes>
        {renderRoutes(routes, isLogged)}
        <Route path="*" element={<Navigate to={notFoundPath} replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouteIdentifier;
