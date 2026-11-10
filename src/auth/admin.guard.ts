import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthRequest } from './jwt-payload';

// AUTORIZACIÓN: ¿eres admin? Va siempre DESPUÉS de AuthGuard
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {} // para leer el rol

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    // request.userId lo ha puesto AuthGuard. Buscamos el rol ACTUAL
    const user = await this.usersService.findById(request.userId);
    if (!user) {
      throw new UnauthorizedException('El usuario ya no existe'); // → 401
    }
    if (user.role !== 'admin') {
      throw new ForbiddenException('Solo para administradores'); // → 403
    }
    return true; // es admin: puede pasar
  }
}