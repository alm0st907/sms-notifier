import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const publicKey = process.env.PUBLIC_KEY;
    //remove bearer from token
    if (token === null || token === undefined) return false;
    const tokenWithoutBearer = token.split(' ')[1];
    try {
      let decoded: any = '';
      if (token) {
        decoded = verify(tokenWithoutBearer, publicKey, {
          algorithms: ['RS256'],
        });
        request['user'] = decoded;
        return true;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
