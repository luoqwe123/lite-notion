import { IsNotEmpty, ValidateIf } from "class-validator"


export class createDto{
    userId:string
    @IsNotEmpty({message:"文档id不能为空"})
    documentId:string
    tag:string
   
}

