import HomeScreen from './HomeScreen';
import { AppScreens } from '../constants';
import LoginScreen from './LoginScreen';
import CreateWishScreen from './CreateWishScreen';

type ScreenInfo = {
  name: AppScreens;
  component: () => JSX.Element;
  showHeader: boolean;
};

export const unAuthScreens = [
  {
    name: AppScreens.LOGIN,
    component: LoginScreen,
    showHeader: false,
  },
] as Array<ScreenInfo>;

export const authScreens = [
  {
    name: AppScreens.HOME,
    component: HomeScreen,
    showHeader: false,
  },
  {
    name: AppScreens.CREATE_WISH,
    component: CreateWishScreen,
    showHeader: true,
  },
] as Array<ScreenInfo>;
