import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pocketgardener.app',
  appName: 'Pocket Gardener',
  webDir: 'out',
  server: {
    url: 'https://pocket-gardener.vercel.app',
    cleartext: false,
  },
};

export default config;