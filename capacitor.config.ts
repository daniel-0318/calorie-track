import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trackcalorie.dr',
  appName: 'Calorie Track',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
