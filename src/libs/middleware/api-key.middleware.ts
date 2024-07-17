import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly apiKey = process.env.API_KEY;

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];

    if (!apiKey || apiKey !== this.apiKey) {
      throw new UnauthorizedException('API Key inválida');
    }

    next();
  }
}
