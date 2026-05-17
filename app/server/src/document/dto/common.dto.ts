

export class createDto{
    title:string
    content:string
    kbId:string
    createBy:string
    teamId:string
}

// 需要验证user在不在这个团队中
export class deleteDto{
    id:string
    status:string
    userId:string
    teamId:string
}

export class findDto{
    kbId:string
    teamId:string
    title:string
    content:string
}