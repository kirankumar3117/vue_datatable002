<template>
 
        <!-- Header Content -->
        <div class="userDetailsHeader">
        <div>
          <font-awesome-icon icon="fa-solid fa-circle-user" style="color: #4980df;font-size: 30px;"/>
        </div>
        <div style="position: relative;top:7px;">
          ID DETAILS
        </div>
      </div>
      <hr/>
      <!-- User Details -->
      <div class="userDetailsList">
       <div>
        <div>
          Name on Card
        </div>
        <div>
          {{ indiviualDetails?.name }}
        </div>
       </div>
       <div>
        <div>
          Date of Birth
        </div>
        <div>
          {{ indiviualDetails?.date_of_birth }}
        </div>
       </div>
       <div>
        <div>
          Phone Number
        </div>
        <div>
          
          {{indiviualDetails?.phone_number}}
        </div>
       </div>
       <div>
        <div>
          Card {{ indiviualDetails?.card_type }}
        </div>
        <div>
          {{indiviualDetails?.card}}
        </div>
       </div>
       <div>
        <div>
          Expiry 
        </div>
        <div>
          {{ indiviualDetails?.card_expiry }}
        </div>
       </div>
      </div>

      <div class="userDetailsOkButton">
        <Button label="OK" @click="handleViewDetails" autofocus style="width:50%;color: white;background-color:#4980df;"></Button>
       
      </div>

    
</template>
<script>
import Button from 'primevue/button';
export default{
    components:{
        Button
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
        handleViewDetails(){
            this.$emit('handle-view-method')
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