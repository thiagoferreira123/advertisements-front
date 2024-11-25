import { Role } from "../../pages/Auth/Login/hook/types";
import { RoutesAndMenuItems } from "../../routes";

export interface RouteIdentifierProps {
  routes: RouteItemProps[];
  fallback?: React.ReactNode;
  notFoundPath?: string;
  isLogged: boolean;
}

export interface RouteItemProps {
  hideInRoute?: boolean;
  redirect?: boolean;
  exact?: boolean;
  protected?: boolean;
  inaccessible?: boolean;
  publicOnly?: boolean;
  index?: boolean;
  path: string;
  to?: string;
  from?: string;
  subs?: RouteItemProps[];
  label?: string;
  icon?: string;
  roles?: Role[];
  hideInMenu?: boolean;
  component?: React.ComponentType;

  [key: string]: any;
}

export interface RedirectProps {
  redirect?: boolean;
  exact?: boolean;
  path: string;
  to: string;
  from?: string;
}

export interface RouteItem {
  path: string;
  redirect?: boolean;
  to?: string;
  component?: React.ComponentType;
  subs?: RouteItem[];
}

export interface Route {
  hideInRoute?: boolean;
  redirect?: boolean;
  protected?: boolean;
  publicOnly?: boolean;
  exact?: boolean;
  isExternal?: boolean;
  noLayout?: boolean;
  inaccessible?: boolean;
  path: string;
  to: string;
  from?: string;
  subs?: Route[];
  roles?: string[];
}

export interface RouteData {
  sidebarItems: Route[];
  mainMenuItems: Route[];
}

export interface convertToRoutesArguments {
  data: RoutesAndMenuItems | RouteItemProps[];
  isLogin?: boolean;
  userRole?: Role;
  authGuardActive?: boolean;
  unauthorizedPath?: string;
  loginPath?: string;
  invalidAccessPath?: string;
  noLayout?: boolean;
}