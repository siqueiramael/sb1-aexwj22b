import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../lib/prisma';
import { LoginDto, RegisterDto } from '../types/auth';
import { UnauthorizedError } from '../utils/errors';

export class AuthService {
  static async login(data: LoginDto) {
    const user = await prisma.user.findUnique({ 
      where: { email: data.email } 
    });
    
    if (!user || !await bcrypt.compare(data.password, user.password)) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    return { 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    };
  }

  static async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        role: true 
      }
    });
  }
}