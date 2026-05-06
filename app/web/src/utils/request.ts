
enum contentType {
    form = "application/x-www-form-urlencoded",
    formData = "multipart/form-data",
    json = "application/json"
}
interface getType {
    params?: string
}
interface postType {
    htype?: "json" | "formData" | "form",
    body: any
}
class ofetch {
    baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;

    }
    async get(url: string, { params }: getType) {
        let requrl  = this.baseUrl+url;
        if(params){
            requrl  +=  `?${params}`
        }
        let res = await fetch(url);
        res = await res.json();
        return res;
    }
    async post(url: string, { htype = "json", body }: postType) {
        if (htype === "json") {
            body = JSON.stringify(body)
        } else if (htype === "form") {
            body = new URLSearchParams(body).toString()
        } else {
            const formData = new FormData();
            Object.entries(body).forEach(([k, v]) => {
                formData.append(k, v as any)
            })
        }
        let res = await fetch(this.baseUrl+url, {
            method:"POST",
            headers: {
                "Content-Type": contentType[htype]
            },
            body
        })
        res = await res.json();
        return res;
    }
}

export const  request = new ofetch('http://localhost:3000/api');
