import { IsNotEmpty, ValidateIf } from "class-validator"


export class findDto {
    id:string
    @ValidateIf((o) => !o.userId)
    @IsNotEmpty({ message: 'teamId 和 userId 不能同时为空' })
    teamId: string
    @ValidateIf((o) => !o.teamId)
    @IsNotEmpty({ message: 'teamId 和 userId 不能同时为空' })
    userId: string
}