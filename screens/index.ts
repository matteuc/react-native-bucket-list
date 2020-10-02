import HomeScreen from './HomeScreen';
import { AppScreens } from '../constants';
import LoginScreen from './LoginScreen';

type ScreenInfo = {
  name: AppScreens;
  component: () => JSX.Element;
};

export const unAuthScreens = [
  {
    name: AppScreens.LOGIN,
    component: LoginScreen,
  },
] as Array<ScreenInfo>;

export const authScreens = [
  {
    name: AppScreens.HOME,
    component: HomeScreen,
  },
  {
    name: AppScreens.CREATE_WISH,
    component: HomeScreen,
  },
] as Array<ScreenInfo>;
