<template>
    <i class="pi pi-search" />
    <InputText v-model="dataTableStore.search" placeholder="Search By Name/Phone "/>
   
</template>


<script>
import { useDataTableStore } from '@/stores/dataTable';
import InputText from 'primevue/inputtext';
export default{
    components:{
        InputText
    },
    setup(){
        const dataTableStore=useDataTableStore();
        return {
            dataTableStore
        }
    },
    updated(){
        this.$emit('handle-search-method')
    }
}

</script>

<style scoped>
</style>