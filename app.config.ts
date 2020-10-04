import 'dotenv/config';

export default {
  name: 'react-native-bucket-list',
  version: '1.0.0',
  extra: {
    AND_CLIENT_ID: process.env.AND_CLIENT_ID, // Replace with Android Client ID during build
    IOS_CLIENT_ID: process.env.IOS_CLIENT_ID, // Replace with iOS Client ID during build
  },
  android: {
    package: 'com.matteuc.buckets',
  },
};
