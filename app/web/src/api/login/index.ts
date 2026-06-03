
import { request } from "~/utils/request";

enum API{
    LOGIN_URL = "login"
}

export interface loginDataType{
    email:string,
    password:string,
    type:string
}

export function login(data:loginDataType){
  
    return request.post<any,any>(API.LOGIN_URL,{
        htype:"form",
        body:data
    })
}