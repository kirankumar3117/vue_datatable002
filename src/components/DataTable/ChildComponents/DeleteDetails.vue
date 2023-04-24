<template>
    <div>
        <div class="DeleteContent">
            <div>
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" style="font-size: 35px;color:#b92222" />
            </div>
            <div>
                Do you want to delete this record ?
            </div>
        </div>

        <div class="DeleteConfirmationButtons">
            <Button label="No" icon="pi pi-times" @click="handleUserDeleteMethod(false)" text></Button>
            <Button label="Yes" icon="pi pi-check" @click="handleUserDeleteMethod(true)" autofocus></Button>
        </div>

    </div>
</template>

<script>
import Button from 'primevue/button';
export default{
    components:{
        Button
    },
    methods:{
        handleUserDeleteMethod(data){
            this.$emit('handle-delete-user-method',data)
        }
    }
}

</script>

<style scoped>
.DeleteContent{
  display: flex;
}
.DeleteContent>div:nth-child(2){
  margin-top: 9px;
  margin-left: 30px;
  font-size: 19px;
}
.DeleteConfirmationButtons{
  width:100%;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>