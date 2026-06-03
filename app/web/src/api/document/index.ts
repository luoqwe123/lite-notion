import { request } from "~/utils/request"

enum API {
    GET_ONE_DOCU = "document/",
    SAVE_DOCU = "document/update",
    FINDALL_URL = "document/findAll"
}


export function getDocById(id: string) {
    return request.get<any, any>(API.GET_ONE_DOCU + id)

}


export interface updateType {
    id: string,
    content: string
}
export function updateDoc(data: updateType) {
    return request.patch<any, any>(API.SAVE_DOCU, {
        htype: "form",
        body: data
    })

}
export function findAllDoc(kbId:string){
    return request.get<any,any>(API.FINDALL_URL,{
        params:{
            kbId
        }
    })
}