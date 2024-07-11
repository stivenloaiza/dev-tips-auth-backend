import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../service/api-key.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      this.logger.warn('API key is missing');
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const isValid = await this.authService.validateApiKey(apiKey);
      if (!isValid) {
        this.logger.warn('Invalid API key');
        throw new UnauthorizedException('Invalid API key');
      }
      this.logger.log('API key is valid');
      return true;
    } catch (error) {
      this.logger.error('Error validating API key', error);
      throw new InternalServerErrorException('Error validating API key');
    }
  }
}
