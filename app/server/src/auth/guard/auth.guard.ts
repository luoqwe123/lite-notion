
import {
    Injectable,
} from '@nestjs/common';


import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// 守卫内统一解析token，挂载req.user
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) { }
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const req = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(req);
//         if (!token) {
//             throw new UnauthorizedException();
//         }
//         try {     
//             const payload = await this.jwtService.verifyAsync(token);
//             req['user'] = payload;
//         } catch {
//             throw new UnauthorizedException();
//         }
//         return true;
//     }
//     private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//     }
// }