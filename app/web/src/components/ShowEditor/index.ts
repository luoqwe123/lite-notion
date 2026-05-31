// showHello.js
import { h, render } from 'vue'
import ShowEditor from "./index.vue"
import type { editorsType } from './type.js'


export function EditorList(editors:any) {
    // 1. 创建容器
    const div = document.createElement('div')
    document.body.appendChild(div)

    // 2. 创建 VNode（极轻！无应用实例）
    const vnode = h(ShowEditor, { editors })

    // 3. 渲染
    render(vnode, div)
    
    function removeList() {
        render(null, div)
        div.remove()
    }

    return {
        removeList
    }
   
}