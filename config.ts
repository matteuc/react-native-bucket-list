import Constants from 'expo-constants';

type Config = {
  AND_CLIENT_ID_PROD: string;
  AND_CLIENT_ID: string;
};

export default Constants.manifest.extra as Config;
