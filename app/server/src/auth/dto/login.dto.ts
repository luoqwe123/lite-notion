
import { IsNotEmpty, ValidateIf } from "class-validator";
// import { IsExistsRule } from "src/common/rules/is-exists.rule";


export class baseDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    email: string;

}


export default class LoginDto extends baseDto {
    @IsNotEmpty({ message: "登录类型不能为空" })
    type: string
    // 只有 type = password 时，才校验密码
    @ValidateIf((o) => o.type === 'password')
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    // 只有 type != password 时，才校验验证码
    @ValidateIf((o) => o.type !== 'password')
    @IsNotEmpty({ message: '验证码不能为空' })
    verifycode: string;

}

