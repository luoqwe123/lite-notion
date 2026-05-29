import { defineStore } from "pinia";
import  { updateType ,updateDoc,getDocById} from "~/api/document";


export const useEditorStore = defineStore("editorStore", {
    state: () => ({
        editorState: true,
        id: ''
    }),
    getters: {

    },
    actions: {
        setCurrDocId(id: string) {
            
            this.$state.id = id
        },
        switchEdiState(){
            this.$state.editorState = !this.$state.editorState;
            
        },
        findOne(id:string){
            return getDocById(id)
        } ,  
        saveDoc(data:updateType){
            return updateDoc(data)
        }

    }
})