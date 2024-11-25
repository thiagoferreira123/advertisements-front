import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from './constants';

export const IS_DEMO = true;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
export const REACT_HELMET_PROPS = {
  defaultTitle: 'OdontCloud | Software para  Cirurgiões-Dentistas',
  titleTemplate: '%s | OdontCloud Software para  Cirurgiões-Dentistas',
};

export const DEFAULT_PATHS = {
  APP: '/app/',
  LOGIN: '/login',
  PATIENT_LOGIN: '/login-paciente',
  PATIENT_DASHBOARD: '/painel-paciente',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  INVALID_ACCESS: '/invalid-access',
  MEET: '/meet/:token',
  METABOLIC_TRAKING: '/rastreamento-metabolico/:key',
  BLOCK: '/block-access',
  PROFESSIONAL_WEBSITE: '/p/:websiteUrl',
  SERVICE_LOCATION_SCHEDULE: '/local-atendimento/:base64LocationId',
  CONFIRMED_SCHEDULE: '/agendamento-confirmado',
  CANCELED_SCHEDULE: '/agendamento-cancelado',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Horizontal,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Unpinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAULT_USER = {
  id: 1,
  name: 'Lisa Jackson',
  thumb: '/img/profile/profile-9.webp',
  role: USER_ROLE.Admin,
  email: 'lisajackson@gmail.com',
};

export const REDUX_PERSIST_KEY = 'classic-dashboard';
