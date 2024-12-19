import { prisma } from '../lib/prisma';
import { UpdateProfileDto } from '../types/user';
import { NotFoundError, UnauthorizedError } from '../utils/errors';
import bcrypt from 'bcrypt';

export class UserService {
  static async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  static async updateProfile(userId: number, data: UpdateProfileDto) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
        role: true,
      },
    });
  }

  static async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || !await bcrypt.compare(currentPassword, user.password)) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
}