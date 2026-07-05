<template>

    <div class="wrokSpace-container min-h-screen bg-(--color-background-default) 
        text-(--color-text-default) transition-colors duration-300 p-6 flex h-screen">
        <ThemeToggle class="absolute top-6 right-6"></ThemeToggle>
        <div class="hidden md:block h-full w-64 shrink-0">
            <NavigationBar :routers="routersRef" />
        </div>

        <div class="flex-1 overflow-auto p-4 h-full">
            <router-view />
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { routers } from '~/routes/router';
import { useRoute } from 'vue-router';
import { useEditorStore } from '~/stores/modules/editor';
const editorStore = useEditorStore();
const route = useRoute()
let routersRef = ref<routeType[] | []>([])

// 工作区名可通过route携带参数获得，就不需要通过stroe获取
interface routeType  {
    path:string,
    name:string,
    meta:{
        name:string,
        isNav:boolean
    }
}

async function getRoutes() {
    let id = route.params.itemId
    let { data } = await editorStore.getAllDoc(id as string)
    let res:routeType[] = [];
    for (const el of data) {
        let routeModel: any = {
            path: "document/" +el.id,
            name: "doc",
            meta: {
                name: el.title,
                isNav: true
            }
        }
        res.push(routeModel)
    }
    return res


}
getRoutes().then((res:any)=>{
    routersRef.value = res
})





</script>

<style scoped>
.wrokSpace-container {
    min-height: 100vh;
}
</style>