import { IS_AUTH_GUARD_ACTIVE, DEFAULT_PATHS } from '../config';
import { Route, RouteItemProps, convertToRoutesArguments } from './protocols/RouteIdentifier';
import { notEmpty } from '../helpers/Utils';
import { RoutesAndMenuItems } from '../routes';
import { Role, User } from '../pages/Auth/Login/hook/types';

const userHasRole = (routeRoles: string[], userRole: string) => {
  if (!userRole && routeRoles?.length) return false;
  return !routeRoles?.length || routeRoles.includes(userRole);
};

const clearRoute = (route: Partial<RouteItemProps>) => {
  const item: {
    [key: string]: any;
  } = {};

  ['path', 'to', 'exact', 'component', 'redirect', 'subs'].forEach((key: string) => {
    if (route[key]) item[key] = route[key];
  });
  return item as RouteItemProps | undefined;
};

const clearMenuItem = (menuItem: RouteItemProps): RouteItemProps | undefined => {
  const item: {
    [key: string]: any;
  } = {};

  ['path', 'label', 'icon', 'isExternal', 'subs', 'mega', 'megaParent'].forEach((key: string) => {
    if (menuItem[key]) item[key] = menuItem[key];
  });

  return item as RouteItemProps | undefined;
};

const clearFlattedMenuItem = (menuItem: RouteItemProps): RouteItemProps | undefined => {
  const item: {
    [key: string]: any;
  } = {};

  ['path', 'label', 'isExternal'].forEach((key) => {
    if (menuItem[key]) item[key] = menuItem[key];
  });
  return item as RouteItemProps | undefined;
};

export const convertToRoutes = ({
  data = [],
  isLogin = false,
  userRole,
  authGuardActive = IS_AUTH_GUARD_ACTIVE,
}: convertToRoutesArguments) => {
  let items: RouteItemProps[] = [];

  if (Array.isArray(data)) {
    items = data;
  } else {
    items = [...data.sidebarItems, ...data.mainMenuItems];
  }

  return async () => {
    const itemMapper: (item: Partial<RouteItemProps>) => Promise<RouteItemProps | undefined> = async (item) => {
      const tempItem: RouteItemProps = { ...item, path: item.path ?? '', to: item.to };

      if (item.hideInRoute) return undefined;

      /* Authentication Guard */
      if (authGuardActive) {
        if (tempItem.roles) tempItem.protected = true;

        if (tempItem.publicOnly) {
          delete tempItem.roles;
          delete tempItem.protected;
        }

        if (tempItem.protected) {
          if (!isLogin) {
            tempItem.redirect = true;
            tempItem.to = DEFAULT_PATHS.LOGIN;
          } else if (tempItem.roles) {
            if (!userRole && !userHasRole(tempItem.roles, userRole ?? '')) {
              tempItem.redirect = true;
              tempItem.to = DEFAULT_PATHS.LOGIN;
            }
          }
        } else if (tempItem.publicOnly && isLogin) {
          tempItem.redirect = true;
          tempItem.to = DEFAULT_PATHS.LOGIN;
        }
      }

      if (item.subs) {
        const tempItemSubs = await Promise.all(item.subs.map(async (sub: RouteItemProps) => {
          const controlledSub = { ...sub, path: String(tempItem.path) + sub.path };
          if (authGuardActive) {
            if (tempItem.protected) controlledSub.protected = true;
            if (tempItem.roles) {
              if (!sub.roles) controlledSub.roles = tempItem.roles;
              else {
                controlledSub.roles = tempItem.roles.filter((x) => sub.roles?.includes(x));

                if (controlledSub.roles && controlledSub.roles.length === 0) {
                  controlledSub.inaccessible = true;
                }
              }
            } else if (tempItem.publicOnly) {
              controlledSub.publicOnly = true;
            }
            if (controlledSub.roles && controlledSub.roles.length === 0) delete controlledSub.roles;

            if (!controlledSub.inaccessible) return itemMapper(controlledSub);

            return await itemMapper({});
          }
          return await itemMapper(controlledSub);
        }))

        const filteredSubs = tempItemSubs.filter(notEmpty);

        tempItem.subs = filteredSubs;
      }

      if (Object.keys(tempItem).length > 0) {
        return (clearRoute(tempItem));
      }

      return tempItem;
    };

    const routes = await Promise.all(items.map(async (item) => {
      const tempItem = await itemMapper(item);
      return tempItem;
    }));

    return routes;
  };
};

export const restructureRoutes = (routes: RouteItemProps[]): RouteItemProps[] => {
  // Função auxiliar para encontrar a rota pai
  const findParentRoute = (path: string, routeList: RouteItemProps[]): RouteItemProps | undefined => {
    for (const route of routeList) {
      if (path.startsWith(route.path ?? '') && path !== route.path) {
        return route;
      }
    }
    return undefined;
  };

  const restructuredRoutes: RouteItemProps[] = [];

  routes.forEach(route => {
    if (route.path === '/') {
      restructuredRoutes.push(route);
    } else {
      const parentRoute = findParentRoute(route.path ?? '', routes);
      if (parentRoute) {
        if (!parentRoute.subs) {
          parentRoute.subs = [];
        }
        parentRoute.subs.push(route);
      } else {
        restructuredRoutes.push(route);
      }
    }
  });

  return restructuredRoutes;
};


export const convertToMenuItems = ({ data = [], authGuardActive = IS_AUTH_GUARD_ACTIVE, isLogin = false, userRole }: {
  data: RoutesAndMenuItems | RouteItemProps[], authGuardActive: any, isLogin: any, userRole?: string
}): RouteItemProps[] => {
  let items = [];
  if (Array.isArray(data)) {
    items = data.filter(route => !route.hideInMenu);
  } else {
    items = [...data.sidebarItems, ...data.mainMenuItems];
  }

  const itemMapper = (item: RouteItemProps): RouteItemProps | undefined => {
    const tempItem = { ...item };

    if (authGuardActive) {
      /* Authentication Guard */
      if (tempItem.roles) tempItem.protected = true;

      if (tempItem.publicOnly) {
        delete tempItem.roles;
        delete tempItem.protected;
      }

      if (tempItem.protected) {
        if (!isLogin) {
          return undefined;
        }
        if (tempItem.roles) {
          if (userRole && !userHasRole(tempItem.roles, userRole ?? '')) {
            return undefined;
          }
        }
      } else if (tempItem.publicOnly && isLogin) {
        return undefined;
      }
    }

    if (tempItem.subs) {
      const subs = item.subs?.map((sub) => {
        const controlledSub = { ...sub, path: tempItem.path + sub.path };
        // if (tempItem.mega || tempItem.megaParent) controlledSub.megaParent = true;

        if (authGuardActive) {
          if (tempItem.protected) controlledSub.protected = true;

          if (tempItem.roles) {
            if (!sub.roles) controlledSub.roles = tempItem.roles;
            else {
              // common roles..
              controlledSub.roles = tempItem.roles.filter((x) => sub.roles?.includes(x));

              if (controlledSub.roles && controlledSub.roles.length === 0) {
                controlledSub.inaccessible = true;
              }
            }
          } else if (tempItem.publicOnly) {
            controlledSub.publicOnly = true;
          }
          if (controlledSub.roles && controlledSub.roles.length === 0) delete controlledSub.roles;

          if (!controlledSub.inaccessible) return itemMapper(controlledSub);
          return undefined;
        }
        return itemMapper(controlledSub);
      })
        .filter(notEmpty)
        .filter((x) => Object.keys(x).length > 0);

      tempItem.subs = subs;

      if (tempItem.subs?.length === 0) delete tempItem.subs;
    }
    if (tempItem.label && !item.hideInMenu) return clearMenuItem(tempItem);

    return undefined;
  };
  return items.map(itemMapper).filter(notEmpty).filter((x) => Object.keys(x).length > 0);
};

export const convertToSearchItems = ({ data = [], authGuardActive = IS_AUTH_GUARD_ACTIVE, isLogin = false, userRole }: {
  data: RoutesAndMenuItems | RouteItemProps[], authGuardActive: any, isLogin: any, userRole?: Role
}) => {
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else {
    items = [...data.sidebarItems, ...data.mainMenuItems];
  }

  const menuItems: (RouteItemProps | undefined)[] = [];

  return () => {
    const itemMapper = (item: RouteItemProps): RouteItemProps | undefined => {
      const tempItem = { ...item };

      if (tempItem.hideInMenu || /*tempItem.isExternal ||*/ tempItem.hideInRoute) {
        return undefined;
      }

      if (authGuardActive) {
        /* Authentication Guard */
        if (tempItem.roles) tempItem.protected = true;

        if (tempItem.publicOnly) {
          delete tempItem.roles;
          delete tempItem.protected;
        }

        if (tempItem.protected) {
          if (!isLogin) {
            return undefined;
          } else if (tempItem.roles) {
            if (!userRole && !userHasRole(tempItem.roles, userRole ?? '')) {
              return undefined;
            }
          }
        } else if (tempItem.publicOnly && isLogin) {
          return undefined;
        }
      }

      if (tempItem && Object.keys(tempItem).length > 0 && tempItem.label) menuItems.push(clearFlattedMenuItem(tempItem));

      if (item.subs) {
        const subs = item.subs?.map((sub) => {
          const controlledSub = { ...sub, path: tempItem.path + sub.path };

          if (authGuardActive) {
            if (tempItem.protected) controlledSub.protected = true;

            if (tempItem.roles) {
              if (!sub.roles) controlledSub.roles = tempItem.roles;
              else {
                // common roles..
                controlledSub.roles = tempItem.roles.filter((x) => sub.roles?.includes(x));

                if (controlledSub.roles && controlledSub.roles.length === 0) {
                  controlledSub.inaccessible = true;
                }
              }
            } else if (tempItem.publicOnly) {
              controlledSub.publicOnly = true;
            }
            if (controlledSub.roles && controlledSub.roles.length === 0) delete controlledSub.roles;

            if (!controlledSub.inaccessible) return itemMapper(controlledSub);
            return undefined;
          }
          return itemMapper(controlledSub);
        })
        .filter(notEmpty)
        .filter((x) => Object.keys(x).length > 0);

        tempItem.subs = subs;
      }
      return tempItem;
    };

    items.map(itemMapper);
    return menuItems;
  };
};

export const getRoutes = ({ data, isLogin, userRole }: {
  data: RoutesAndMenuItems | RouteItemProps[],
  isLogin: boolean,
  userRole: Role
}) =>
  convertToRoutes({
    data,
    isLogin,
    userRole,
    authGuardActive: IS_AUTH_GUARD_ACTIVE,
    unauthorizedPath: DEFAULT_PATHS.UNAUTHORIZED,
    loginPath: DEFAULT_PATHS.LOGIN,
    invalidAccessPath: DEFAULT_PATHS.INVALID_ACCESS,
    noLayout: false,
  })();

export const getLayoutlessRoutes = ({ data, user }: { data: RoutesAndMenuItems | RouteItemProps[], user: User | null }) => convertToRoutes({
  data,
  userRole: user?.role,
  isLogin: user ? true : false,
})();

export const getMenuItems = ({ data, isLogin, userRole }: {
  data: RoutesAndMenuItems | RouteItemProps[],
  isLogin: boolean,
  userRole: Role
}) => convertToMenuItems({ data, isLogin, userRole, authGuardActive: IS_AUTH_GUARD_ACTIVE });

export const getSearchItems = ({ data, isLogin, userRole }: {
  data: RoutesAndMenuItems | RouteItemProps[],
  isLogin: boolean,
  userRole: Role
}) => convertToSearchItems({ data, isLogin, userRole, authGuardActive: IS_AUTH_GUARD_ACTIVE });
