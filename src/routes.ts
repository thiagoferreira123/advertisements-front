import { lazy } from 'react';
import { DEFAULT_PATHS } from './config';
import { RouteItemProps } from './routing/protocols/RouteIdentifier';

const dashboard = lazy(() => import('./pages/Dashboard'));

const advertisement = {
  create: lazy(() => import('./pages/advertisement/CreateAdvertisement')),
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
    {
      path: `${appRoot}/advertisement/create`,
      label: 'createAdvertisement',
      component: advertisement.create,
      roles: [],
      hideInMenu: true,
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
