import { request } from "~/utils/request";


enum API {
    FIND_URL = "workspace",
    FINDALL_URL = "workspace/findAll"
}


export function getWorkSpa(id?:string){
    let data:any = {}
    if(id){
        data.params = id
    }
    return request.get(API.FIND_URL,{
        params:{
            id
        }
    })
}

export function getAllWorkSpa(teamId:number[]){
   
    return request.post(API.FINDALL_URL,{
        htype:"json",
        body:{
            teamId
        }
    })
}

