import { IsNotEmpty } from "class-validator";



export default class CreateSpaceDto{
    @IsNotEmpty({message:"空间名不能为空"})
    name:string;
    description:string;
    @IsNotEmpty({message:"团队id不能为空"})
    teamId:number;


}