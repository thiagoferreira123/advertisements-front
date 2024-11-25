import { Patient } from './Patient';

export interface ThemeValues {
  font: string;
  primary: string;
  warning: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  borderRadiusMd: string;
  separatorLight: string;
  alternate: string;
  body: string;
  lightText: string;
  danger: string;
  success: string;
  info: string;
  dark: string;
  darkText: string;

  primaryrgb: string;
  secondaryrgb: string;
  tertiaryrgb: string;
  quaternaryrgb: string;
  dangerrgb: string;
  inforgb: string;
  warningrgb: string;
  successrgb: string;
  lightrgb: string;
  darkrgb: string;
  bodyrgb: string;

  fontHeading: string;

  background: string;
  foreground: string;
  separator: string;

  transitionTimeShort: string;
  transitionTime: string;
  navSizeSlim: string;

  borderRadiusXl: string;
  borderRadiusLg: string;
  borderRadiusSm: string;
  spacingHorizontal: string;

  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  direction: string;
}

export interface SettingsState {
  themeValues: ThemeValues;
  color: string;
}

export interface ChatItem {
  id: number;
  messages: string[];
}

export interface Chat {
  id: number;
}

export interface ChatState {
  items: ChatItem[];
  loading: unknown;
  currentMode: unknown;
  selectedTab: string;
  selectedPatient: Patient;
  currentCall: {
    name: string;
    thumb: string;
  };
}

export interface Notification {
  detail: string;
  link: string;
  img: string;
}

export interface NotificationState {
  items: Notification[];
}

export interface MenuState {
  behaviour: string;
  placement: string;
  useSidebar: boolean;
  pinButtonEnable: boolean;
  placementStatus: { placementHtmlData: string; dimensionHtmlData: string; view: string };
  behaviourStatus: { behaviourHtmlData: string };
  navClasses: string[];
  attrMobile: boolean;
  attrMenuAnimate: string;
  collapseAll: boolean;
  breakpoints: {
    verticalUnpinned: number;
    verticalMobile: number;
    horizontalMobile: number;
  };
  menuPadding: 0;
}

export interface LayoutState {
  showingNavMenu: string;
}

export interface InterfaceState {
  settings: SettingsState;
  chat: ChatState;
  menu: MenuState;
  notification: NotificationState;
  layout: LayoutState;
}

export type BootstrapBackgroundVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-light'
  | 'outline-dark'
  | 'foreground';
