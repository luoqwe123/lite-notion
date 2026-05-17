

type dataType = {
    [key:string]:string
}
type resType = {
    [key:string] :number
}
export function idToNum(data:dataType):resType{
    let res = {};
    for (const key in data) {
        if (!data.hasOwnProperty(key)) continue;
        if(key.toLowerCase().includes("id")){
            let value = data[key]
            res[key] = +value;
        }
    }
    return res;
}