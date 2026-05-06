import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return {
        token:"dfalsjdflas",
        message:"success"
    };
  }
}
