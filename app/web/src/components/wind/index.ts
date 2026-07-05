import { h, render } from "vue"
import Message from "./index.vue"

export function createMessage(message: string) {

    let contianer = document.createElement("div")
    document.body.appendChild(contianer)
    let vnode = h(Message, { message })
    render(vnode, contianer)
    function close() {
        // 组件内部关闭后自动销毁
        render(null, contianer);
        contianer.remove();
    }
    return {
        close
    }
}