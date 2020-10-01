import HomeScreen from './HomeScreen';
import { AppScreens } from '../constants';
import LoginScreen from './LoginScreen';

type ScreenInfo = {
  name: AppScreens;
  component: () => JSX.Element;
};

export default [
  {
    name: AppScreens.HOME,
    component: HomeScreen,
  },
  {
    name: AppScreens.LOGIN,
    component: LoginScreen,
  },
] as Array<ScreenInfo>;
