export enum AppScreens {
  HOME = 'Home',
  LOGIN = 'Login',
}

export type AppUser = {
  id: string;
  name: string;
  email: string;
  image: string;
} | null;

export type AppUserForm = {
  name: string;
  email: string;
  image: string;
};
