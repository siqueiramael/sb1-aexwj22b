import { prisma } from '../lib/prisma';
import { UnifiService } from './unifi.service';
import { logger } from '../utils/logger';

export class SiteService {
  static async getSites() {
    return prisma.site.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getSiteDetails(id: number) {
    const site = await prisma.site.findUnique({
      where: { id },
    });

    if (!site) {
      throw new NotFoundError('Site not found');
    }

    try {
      const unifi = UnifiService.getInstance();
      const unifiSiteDetails = await unifi.getSiteDetails(site.unifiSiteId);
      return { ...site, ...unifiSiteDetails };
    } catch (error) {
      logger.error('Failed to get UniFi site details:', error);
      return site;
    }
  }

  static async syncWithUnifi() {
    const unifi = UnifiService.getInstance();
    const unifiSites = await unifi.getSites();

    const results = {
      total: unifiSites.length,
      created: 0,
      updated: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const unifiSite of unifiSites) {
      try {
        await prisma.site.upsert({
          where: { unifiSiteId: unifiSite.id },
          update: { name: unifiSite.name },
          create: {
            name: unifiSite.name,
            unifiSiteId: unifiSite.id,
          },
        });
        
        if (unifiSite.id) {
          results.updated++;
        } else {
          results.created++;
        }
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to sync site ${unifiSite.name}: ${error.message}`);
      }
    }

    return results;
  }
}