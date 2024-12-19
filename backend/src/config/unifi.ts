import { UnifiConfig } from '../types/unifi';

export const unifiConfig: UnifiConfig = {
  controllerUrl: process.env.UNIFI_CONTROLLER_URL || '',
  username: process.env.UNIFI_USERNAME || '',
  password: process.env.UNIFI_PASSWORD || '',
};