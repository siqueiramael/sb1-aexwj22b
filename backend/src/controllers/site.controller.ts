import { Request, Response } from 'express';
import { SiteService } from '../services/site.service';

export class SiteController {
  static async getSites(req: Request, res: Response) {
    const sites = await SiteService.getSites();
    res.json(sites);
  }

  static async getSiteDetails(req: Request, res: Response) {
    const { id } = req.params;
    const site = await SiteService.getSiteDetails(Number(id));
    res.json(site);
  }

  static async syncSites(req: Request, res: Response) {
    const result = await SiteService.syncWithUnifi();
    res.json(result);
  }
}