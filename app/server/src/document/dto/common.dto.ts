import { DocumentStatus } from "@/common/constants"
import { IsNotEmpty } from "class-validator"


class baseDto {
    @IsNotEmpty({ message: "团队id不能为空" })
    teamId: string
}

export class createDto extends baseDto {
    @IsNotEmpty({ message: "标题不能为空" })
    title: string
    content: string
    @IsNotEmpty({ message: "空间id不能为空" })
    kbId: string
    userId: string
}

// 需要验证user在不在这个团队中
export class deleteDto extends baseDto {
    @IsNotEmpty({ message: "文档id不能为空" })
    id: string

}

export class findDto extends baseDto {
    @IsNotEmpty({ message: "空间id不能为空" })
    kbId: string

    title: string
    content: string
}

export class updateDto extends baseDto {
    @IsNotEmpty({ message: "文档id不能为空" })
    id: string

    title: string
    status: DocumentStatus
}