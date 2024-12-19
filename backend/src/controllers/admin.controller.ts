import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { CreateUserDto, ImportUsersDto } from '../types/admin';

export class AdminController {
  static async createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
    const user = await AdminService.createUser(req.body);
    res.status(201).json(user);
  }

  static async importUsers(req: Request, res: Response) {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await AdminService.importUsers(file);
    res.json(result);
  }

  static async getUsers(req: Request, res: Response) {
    const { page = 1, limit = 10, search } = req.query;
    const users = await AdminService.getUsers({
      page: Number(page),
      limit: Number(limit),
      search: search as string,
    });
    res.json(users);
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await AdminService.deleteUser(Number(id));
    res.status(204).send();
  }
}