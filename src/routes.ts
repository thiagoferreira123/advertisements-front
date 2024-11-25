import { lazy } from 'react';
import { DEFAULT_PATHS } from './config';
import { RouteItemProps } from './routing/protocols/RouteIdentifier';

const dashboard = lazy(() => import('./pages/Dashboard'));

const Login = {
  index: lazy(() => import('./pages/Auth/Login')),
  ForgotPassword: lazy(() => import('./pages/Auth/ForgotPassword/index')),
  Register: lazy(() => import('./pages/Auth/Register/index')),
  ResetPassword: lazy(() => import('./pages/Auth/ResetPassword/index')),
};

const ferramentas = {
  index: lazy(() => import('./views/apps/Apps')),
};

const pages = {
  index: lazy(() => import('./views/pages/Pages')),
  authentication: {
    login: lazy(() => import('./pages/authentication/Login')),
    register: lazy(() => import('./pages/authentication/Register')),
    forgotPassword: lazy(() => import('./pages/authentication/ForgotPassword')),
    resetPassword: lazy(() => import('./pages/authentication/ResetPassword')),
  },

};

const patientMenu = {
  Register: lazy(() => import('./pages/Auth/Register/index')),
  ResetPassword: lazy(() => import('./pages/Auth/ResetPassword/index')),
};

export const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(0, DEFAULT_PATHS.APP.length - 1) : DEFAULT_PATHS.APP;

export interface RoutesAndMenuItems {
  mainMenuItems: RouteItemProps[];
  sidebarItems: RouteItemProps[];
}

const routesAndMenuItems: RoutesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      label: 'home',
      icon: 'home',
      component: dashboard,
      roles: [],
    },
  ],

  sidebarItems: [
    { path: '#connections', label: 'menu.connections', icon: 'diagram-1', hideInRoute: true },
    { path: '#bookmarks', label: 'menu.bookmarks', icon: 'bookmark', hideInRoute: true },
    { path: '#requests', label: 'menu.requests', icon: 'diagram-2', hideInRoute: true },
    {
      path: '#account',
      label: 'menu.account',
      icon: 'user',
      hideInRoute: true,
      subs: [
        { path: '/settings', label: 'menu.settings', icon: 'gear', hideInRoute: true },
        { path: '/password', label: 'menu.password', icon: 'lock-off', hideInRoute: true },
        { path: '/devices', label: 'menu.devices', icon: 'mobile', hideInRoute: true },
      ],
    },
    {
      path: '#notifications',
      label: 'menu.notifications',
      icon: 'notification',
      hideInRoute: true,
      subs: [
        { path: '/email', label: 'menu.email', icon: 'email', hideInRoute: true },
        { path: '/sms', label: 'menu.sms', icon: 'message', hideInRoute: true },
      ],
    },
    {
      path: '#downloads',
      label: 'menu.downloads',
      icon: 'download',
      hideInRoute: true,
      subs: [
        { path: '/documents', label: 'menu.documents', icon: 'file-text', hideInRoute: true },
        { path: '/images', label: 'menu.images', icon: 'file-image', hideInRoute: true },
        { path: '/videos', label: 'menu.videos', icon: 'file-video', hideInRoute: true },
      ],
    },
  ],
};
export default routesAndMenuItems;
