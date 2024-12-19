import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../types/auth';

export class AuthController {
  static async login(req: Request<{}, {}, LoginDto>, res: Response) {
    const result = await AuthService.login(req.body);
    res.json(result);
  }

  static async register(req: Request<{}, {}, RegisterDto>, res: Response) {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  }
}