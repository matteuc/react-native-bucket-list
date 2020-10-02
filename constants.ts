export enum AppScreens {
  HOME = 'Home',
  LOGIN = 'Login',
  CREATE_WISH = 'Create Wish',
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

export type WishForm = {
  name: string;
  description: string;
};
