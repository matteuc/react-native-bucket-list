import Constants from 'expo-constants';

type Config = {
  AND_CLIENT_ID: string;
  IOS_CLIENT_ID: string;
};

export default Constants.manifest.extra as Config;
