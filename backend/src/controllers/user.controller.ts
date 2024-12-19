import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UpdateProfileDto } from '../types/user';

export class UserController {
  static async getProfile(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await UserService.getProfile(userId);
    res.json(user);
  }

  static async updateProfile(req: Request<{}, {}, UpdateProfileDto>, res: Response) {
    const userId = req.user!.id;
    const user = await UserService.updateProfile(userId, req.body);
    res.json(user);
  }

  static async changePassword(req: Request, res: Response) {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;
    await UserService.changePassword(userId, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  }
}