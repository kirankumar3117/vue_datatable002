<template>
 
 <div>
        <div class="userDetailsHeader">
        <div>
          <font-awesome-icon icon="fa-solid fa-circle-user" style="color: #4980df;font-size: 30px;"/>
        </div>
        <div style="position: relative;top:7px;">
          ID: {{ indiviualDetails.id }}
        </div>
      </div>
      </div>

      <hr/>

      <div class="userDetailsList" style="margin-top: 15px;">
       <div>
        <div>
          Name on Card
        </div>
        <div>
          <InputText v-model="indiviualDetails.name" />
        </div>
       </div>
       <div>
        <div>
          Date of Birth
        </div>
        <div>
          <InputText v-model="indiviualDetails.date_of_birth"/>
        </div>
       </div>
       <div>
        <div>
          Phone Number
        </div>
        <div>
          <InputText v-model="indiviualDetails.phone_number"/>
        </div>
       </div>
       <div>
        <div>
          Card {{ indiviualDetails.card_type }}
        </div>
        <div>
          <InputText v-model="indiviualDetails.card"/>
        </div>
       </div>
       <div>
        <div>
          Expiry 
        </div>
        <div>
          <InputText v-model="indiviualDetails.card_expiry"/>
        </div>
       </div>
      </div>
      <div class="editOkButtonBox">
        <Button label="OK"  style="width:50%" @click="handleUserDetailsOkEdit(data)" autofocus />
      </div>


</template>
<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
export default{
components:{
    Button,
    InputText
},
data(){
    return{
       
    }
},
props:{
    indiviualDetails:Object,
    viewDetailsShow:Boolean
},

methods:{
    handleUserDetailsOkEdit(){
        this.$emit('handle-edit-method',this.indiviualDetails)
    }
}
}
</script>
<style scoped>
.userDetailsHeader{
display:flex;
flex-direction: row;
gap:15px;
margin-bottom: 10px;
}
.userDetailsList{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:20px;
  margin-left: 10px;
  margin-top: 15px;
}
.userDetailsList>div>div:nth-child(1){
font-weight: bold;
}
.userDetailsList>div>div:nth-child(2){
margin-top: 08px;
}
.userDetailsOkButton{
width:100%;
text-align: center;
margin-top: 25px;
}
</style>