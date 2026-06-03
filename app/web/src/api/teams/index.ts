import { request } from "~/utils/request";


enum API {
    FINDONE_URL = "",
    FINDALL_URL = "teamMember"
}


export function findAll(){
    return request.get<any,any>(API.FINDALL_URL)
}
