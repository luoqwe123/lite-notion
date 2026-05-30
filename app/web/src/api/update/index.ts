
import { request } from "~/utils/request";


enum API{
    UPLOAD_IMAGE = "update/image"
}


export function uploadImg(file:Blob){
    return request.post<any,any>(API.UPLOAD_IMAGE,{
        htype:"formData",
        body:{file}
    })
}
