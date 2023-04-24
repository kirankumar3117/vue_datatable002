import {defineStore} from "pinia"

export const useDataTableStore=defineStore('datatable',{
    state:()=>({
        search:''
    })
})