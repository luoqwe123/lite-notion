
import { IsNotEmpty, ValidateIf } from "class-validator"

export class baseDto {
    @IsNotEmpty({ message: "团队编号不能为空" })
    teamId: string
    userId: string
}
export class commonDto extends baseDto {

    @IsNotEmpty({ message: "空间名不能为空" })
    name: string
}



export class findDto {
    @ValidateIf((o) => !(o.teamId&&o.name))
    @IsNotEmpty({ message: '必须包含一个查询字段' })
    id: string
    @ValidateIf((o) => !(o.id&&o.name))
    @IsNotEmpty({ message: '必须包含一个查询字段' })
    teamId: string
    @ValidateIf((o) => !(o.id&&o.teamId))
    @IsNotEmpty({ message: '必须包含一个查询字段' })
    name: string
}