import { Injectable } from "@nestjs/common";
import "dotenv/config";
import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import  { ConfigService } from "@nestjs/config"

// 校验请求头是否有token ，并解析token，将user信息放到request中

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configServicec: ConfigService) {
      
        super({
            //解析用户提交的Bearer Token header数据
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密的 密钥
            secretOrKey:process.env['TOKEN_SECRET']

        })
      
    }
    //验证通过后,执行以下代码返回用户资料,返回值会自动添加到请求体的user属性
    async validate (payload: any){
        return payload;
    }
}