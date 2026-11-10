import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthRequest } from './jwt-payload';

// AUTORIZACIÓN: ¿eres empleado? Va siempre DESPUÉS de AuthGuard
@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {} // para leer el rol

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    // request.userId lo ha puesto AuthGuard. Buscamos el rol ACTUAL
    const user = await this.usersService.findById(request.userId);
    if (!user) {
      throw new UnauthorizedException('El usuario ya no existe'); // → 401
    }
    if (user.role !== 'employee') {
      throw new ForbiddenException('Solo para empleados'); // → 403
    }
    return true; // es empleado: puede pasar
  }
}