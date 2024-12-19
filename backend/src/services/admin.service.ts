import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../types/admin';
import { UnifiService } from './unifi.service';
import { logger } from '../utils/logger';
import * as XLSX from 'xlsx';

export class AdminService {
  static async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    try {
      const unifi = UnifiService.getInstance();
      await unifi.createHotspotUser({
        name: user.name,
        note: `Created by admin for user ${user.id}`,
        usergroup_id: data.usergroup_id,
        site_id: data.site_id,
      });
    } catch (error) {
      logger.error('Failed to create UniFi user:', error);
      // Continue anyway as the user is created in our system
    }

    return user;
  }

  static async importUsers(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const users = XLSX.utils.sheet_to_json(worksheet);

    const results = {
      total: users.length,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const userData of users) {
      try {
        await this.createUser(userData as CreateUserDto);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to create user ${userData.email}: ${error.message}`);
      }
    }

    return results;
  }

  static async getUsers({ page, limit, search }: { page: number; limit: number; search?: string }) {
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search } },
      ],
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        limit,
      },
    };
  }

  static async deleteUser(id: number) {
    await prisma.user.delete({ where: { id } });
  }
}