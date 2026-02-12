import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pocketgardener.app',
  appName: 'Pocket Gardener',
  webDir: 'out', // Changed from 'public' to 'out'
  server: {
    androidScheme: 'https'
  }
};

export default config;