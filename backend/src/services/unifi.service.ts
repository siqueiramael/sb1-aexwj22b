import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { config } from '../config';
import { UnifiUserData } from '../types/unifi';
import { logger } from '../utils/logger';

export class UnifiService {
  private static instance: UnifiService;
  private client: AxiosInstance;
  private cookie: string | null = null;

  private constructor() {
    this.client = axios.create({
      baseURL: config.unifi.controllerUrl,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
  }

  static getInstance(): UnifiService {
    if (!UnifiService.instance) {
      UnifiService.instance = new UnifiService();
    }
    return UnifiService.instance;
  }

  private async login() {
    try {
      const response = await this.client.post('/api/login', {
        username: config.unifi.username,
        password: config.unifi.password,
      });

      this.cookie = response.headers['set-cookie']?.[0];
      this.client.defaults.headers.Cookie = this.cookie;
    } catch (error) {
      logger.error('UniFi login error:', error);
      throw new Error('Failed to login to UniFi Controller');
    }
  }

  async createHotspotUser(userData: UnifiUserData) {
    if (!this.cookie) {
      await this.login();
    }

    try {
      const response = await this.client.post(
        `/api/s/${userData.site_id}/rest/user`,
        userData
      );
      return response.data;
    } catch (error) {
      logger.error('Create hotspot user error:', error);
      throw new Error('Failed to create hotspot user');
    }
  }

  async getSites() {
    if (!this.cookie) {
      await this.login();
    }

    try {
      const response = await this.client.get('/api/self/sites');
      return response.data?.data || [];
    } catch (error) {
      logger.error('Get sites error:', error);
      throw new Error('Failed to get sites');
    }
  }
}