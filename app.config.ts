import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  name: 'Buckets',
  extra: {
    AND_CLIENT_ID_PROD: process.env.AND_CLIENT_ID_PROD,
    IOS_CLIENT_ID_PROD: process.env.IOS_CLIENT_ID_PROD,
    IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
    AND_CLIENT_ID: process.env.AND_CLIENT_ID,
  },
});
