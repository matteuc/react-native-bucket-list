export enum AppScreens {
  HOME = 'Home',
  LOGIN = 'Login',
  CREATE_WISH = 'Create Wish',
  VIEW_EDIT_WISH = 'View Wish',
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

export type Wish = {
  id: string;
  completed: boolean;
  name: string;
  description: string;
  createdAt: number;
  completedAt: number;
};

export const WISHES_COLLECTION = 'wishes';
export const USERS_COLLECTION = 'users';
