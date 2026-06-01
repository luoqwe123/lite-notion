


interface routersType {
    path:string,
    component: any,
    meta:{
        name:string,
        isNav:boolean
    }
    children:routersType[]
}