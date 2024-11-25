export interface LoginValues {
  email: string;
  password: string;
}

export interface ResetPasswordValues {
  password: string;
  passwordConfirm: string;
  token: string;
}

export interface RegisterValues {
  name: string;
  email: string;
  cpf: string;
  password: string;
  password_confirm: string;
  terms: boolean;
}

export type CreateAuthStore = {
  isLoggedIn: boolean;
  user: User | null;
  login: (values: LoginValues) => Promise<User>;
  register: (values: RegisterValues) => Promise<void>;
  forgotPassword: (values: { email: string }) => Promise<void>;
  resetPassword: (values: ResetPasswordValues) => Promise<void>;
  updateIdentificationImages: (values: UpdateIdentificationImagesDto) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  getUser: () => User | null;
  setUser: (user: User) => void;
}
export enum PriceNames {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  SEMI_ANNUALLY = 'semi-annually',
}

export interface User {
  advertiser_id: string;
  name: string;
  email: string;
  cpf: string;
  birth: string;
  password: string;
  document_photo?: string;
  document_selfie?: string;
  subscription_id?: string;
  reset_password_token?: string;
  reset_password_token_expires?: string;
  stripe_customer_id?: string;
  checked?: boolean;
}

export enum Role {
  PROFESSIONAL = 'profissional',
  SECRETARY = 'secretaria',
}

type UpdateIdentificationImagesDto = {
  document_photo: string;
  document_selfie: string;
}