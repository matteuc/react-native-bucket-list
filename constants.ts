export enum AppScreens {
  HOME = 'Home',
  LOGIN = 'Login',
}

export type AppUser = {
  name: string;
  email: string;
  image: string;
} | null;
