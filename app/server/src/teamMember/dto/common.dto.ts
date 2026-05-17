
import { IsNotEmpty } from "class-validator"



export class baseDto {
    @IsNotEmpty({ message: "团队编号不能为空" })
    teamId: string
    userId: string
}

export class memberDto extends baseDto {

    @IsNotEmpty({ message: "role不能为空" })
    role: string
}

