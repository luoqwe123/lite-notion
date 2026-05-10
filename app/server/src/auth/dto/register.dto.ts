
import { IsNotEmpty,ValidateIf } from "class-validator";
// import { IsExistsRule } from "src/common/rules/is-exists.rule";



export default class registerDto  {
    @IsNotEmpty({ message: "用户名不能为空" })
    email: string;
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
    @IsNotEmpty({ message: '验证码不能为空' })
    verifycode: string;

}

