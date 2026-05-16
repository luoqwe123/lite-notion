
import { IsNotEmpty } from "class-validator";


export default class UpdateDto{

    @IsNotEmpty({message:"团队名不能为空"})
    name:string;

    description:string;

 
    @IsNotEmpty({message:"团队头像不能为空"})
    avatar:string;

}