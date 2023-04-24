<template>

<!-- Dialog Boxes -->

  <div>
    

    <!-- User View Dialog Box -->

    <Dialog v-model:visible="viewDetailsShow" modal header="DETAILS" :style="{ width: '30vw',marginTop:'-100px'}" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" >

      <ViewDetails v-if="viewDetailsShow" :indiviual-details="indiviualDetails" @handle-view-method="handleViewUser"/>

    </Dialog> 

    <!-- User Edit Dialog Box -->
    
    <Dialog v-model:visible="editDetailsShow" modal header="EDIT" :style="{ width: '30vw',marginTop:'-100px'}" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" >

      <EditDetails :indiviual-details="indiviualDetails" @handle-edit-method="handleUserDetailsOkEdit"/>
     
    </Dialog>

    <!-- Users || User Delete Dialog Box -->
    
    <Dialog v-model:visible="DeleteOptionShow" modal header="DELETE" :style="{ width: '25vw',marginTop:'-100px'}" :breakpoints="{ '960px': '75vw', '641px': '100vw' }" >
      <DeleteDetails @handle-delete-user-method="confirmDeleteUser"/>
    </Dialog>

  </div>

  <!-- Data Table & Menu bar -->

  <div style="height:600px;width:60%;overflow:auto;margin-left: 20%; margin-top:100px;" p-paginator-next:red>

    <!-- Menu Bar -->

    <MenuBar :getDataLength="getDataLength" :spin="spin" :listboxShow="listboxShow" @handle-export-method="exportCSV"
    @handle-filter-by-cylinder="handleFilterByCylinder" @handle-search-method="handleSearch" @handle-refresh-method="handleRefreshData" ref="childMenubar"/>
    

    <!-- <div class="listbox">
            
            <div >
                <Listbox v-model="selectedCylinder" :options="cylinderList" optionLabel="name" class="w-full md:w-14rem " />
            </div>
        </div> -->


    <br />
    <div :class="listboxShow || dateboxShow || dataRefreshShow? 'bgChange' : ''">

      <DataTable v-model:selection="selectedProduct" selectionMode="multiple" paginator :rows="5" :value="this.data"
        dataKey="id" tableStyle="min-width: 50rem" ref="dt">
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem" @click="handleCheckBox"></Column>
        <Column field="id" header="Id"></Column>
        <Column field="first_name" header="Name"></Column>
        <Column field="phone_number" header="Phone Number"></Column>
        <Column field="quantity" header="Qty"></Column>
        <Column field="total_amount" header="Total Amount"></Column>

        <Column  #body={data} header="Actions">
          <div class="userIconsBox">
            <div>
              <font-awesome-icon icon="fa-solid fa-eye" onmouseover="this.style.color='#4980df'" onmouseleave="this.style.color='#495057'"
              style="color:#495057" @click="handleViewUser(data)"
              />
            </div>
           <div>
            <font-awesome-icon icon="fa-solid fa-user-pen" onmouseover="this.style.color='#4980df'" onmouseleave="this.style.color='#495057'"
              style="color:#495057" @click="handleUserEditDetails(data)"/>
           </div>
           <div>
            <font-awesome-icon icon="fa-solid fa-trash" onmouseover="this.style.color='#4980df'" onmouseleave="this.style.color='#495057'"
              style="color:#495057" @click="deleteUsers(data)"/>
           </div>
          </div>
        </Column>

      </DataTable>
    </div>
  </div>
</template> 

<script>
import Dialog from "primevue/dialog";
import ViewDetails from './ChildComponents/ViewDetails.vue';
import EditDetails from './ChildComponents/EditDetails.vue';
import DeleteDetails from './ChildComponents/DeleteDetails.vue';
import DataTable from 'primevue/datatable';
import Column from "primevue/column"
import UserData from "@/assets/data.json"
import { ref } from 'vue';
import MenuBar from "./ChildComponents/MenuBar.vue";
import { useDataTableStore } from "@/stores/dataTable";
import Listbox from "primevue/listbox";
export default {
  components: {
    Dialog,
    ViewDetails,
    EditDetails,
    DeleteDetails,
    DataTable,
    Column,
    MenuBar,
    Listbox
  },
  props:{
    search:String
  },
  data() {
    return {   
      checkSwitch: "single",
     
      listboxShow: false,
      spin: false,
      dateList: ([
        {
          name: 'Week',
        },
        {
          name: 'Month'
        },
        {
          name: 'Year'
        },
        {
          name: 'Custom'
        }
      ]),
      selectedDate: '',
      dateboxShow: false,
      dateDialogShow: false,
      dataRefreshShow:false,
      viewDetailsShow:false,
      indiviualDetails:{},
      editDetailsShow:false,
      DeleteOptionShow:false
    };
  },
  setup() {
    const dt = ref();
    const selectedProduct=ref([]);
    let data=ref(UserData);
    const dataTableStore=useDataTableStore();

    const exportCSV = async () => {
      data.value= selectedProduct.value?.length>0 ? selectedProduct.value : UserData;
      setTimeout(()=>{
        dt.value.exportCSV();
        data.value=UserData
      },100)

    
    };
    return {
      dt,
      exportCSV,
      selectedProduct,
      data,
      dataTableStore
    }
  },
  computed: {
    getDataLength() {
      if(this.selectedProduct.length > 0){
        return this.selectedProduct.length
      }
      return this.data.length
    },
    deleteShow() {
      return this.selectedProduct?.length > 1 ? true : false;
    },
    findUserDetailsShow() {
      return this.selectedProduct.value.length == 1 ? true : false;
    }
    
  },
  watch: {
   
    
   
  },
  methods: {
    handleFilterByCylinder(val){
      if(!val){
        this.listboxShow=!this.listboxShow
        return
      }
     const filterData=this.data?.filter((e) => {
        return (e.quantity == +val)
      })
      this.listboxShow = false;
      this.data=filterData
    },
    handleSearch(val) {
      const dataa = UserData.filter((e) => {
        return (e.phone_number.includes(val) || e.name.toLowerCase().includes(val.toLowerCase()))
      })
      this.data = dataa
    },
    handleCheckBox() {
      console.log(this.checkSwitch)
      this.checkSwitch = 'null'
    },
    onRowSelect() {
      console.log("Row Selected")
    },
    handleRefreshData() {
      this.dataRefreshShow=true
      this.spin = true;
      this.dataTableStore.search=''
      setTimeout(() => {
        this.data = UserData;
        this.spin = false;
        this.selectedProduct = [];
        this.dataRefreshShow=false
      }, 1000)
    },
    handleViewUser(data){
      if(typeof(data)==='object'){
        this.indiviualDetails=data
        this.viewDetailsShow=true;
        this.selectedProduct=[]
      }
      else{
        Object.assign(this.$data, this.$options.data.call(this));
        this.viewDetailsShow=false;
        this.indiviualDetails={};
        this.selectedProduct=[]
      }
    },
    checkData(e) {
      e.target.textContent == 'Custom' ? this.dateDialogShow = true : null;
      this.dateboxShow = false
    },
    deleteUsers(val) {
      this.indiviualDetails=val
      this.DeleteOptionShow=true    
    },
    confirmDeleteUser(confirmation){
     if(!confirmation){
      this.selectedProduct=[]
      return this.DeleteOptionShow=false ;
     }
      if(this.indiviualDetails.id){
        const dataa=this.data.filter((e)=>{
          return e.id===this.indiviualDetails.id ? '' : e;
        })
        this.data=dataa;
        this.selectedProduct=[]
        this.handleRefreshData()
        this.DeleteOptionShow=false;
      }
      else{
        this.selectedProduct.forEach((product)=>{
          const dataa= this.data.filter((e)=>{
            return product.id==e.id ? '' : e;
          })
          this.data=dataa
        })
        this.selectedProduct=[];
        this.handleRefreshData();
        this.DeleteOptionShow=false;

      }
    },
    handleUserEditDetails(data){
      this.indiviualDetails=data,
      this.editDetailsShow=true
    },
    handleUserDetailsOkEdit(){
      console.log("edit details appear ",this.indiviualDetails);
      this.selectedProduct=[]
      this.editDetailsShow=false;

      console.group("edited")
    },
   

  },
  
 

};
</script>

<style>




.listbox {
  position: absolute;
  z-index: 2;
  margin-left: 39.5%;
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 9px;
}

.bgChange {
  opacity: 0.5;
  pointer-events: none;

}

.listIcon {
  font-size: 25px;
  cursor: pointer;
}



.datebox {
  position: absolute;
  font-size: 30px;
  margin-left: 32%;
  margin-top: 5px;
  width: 200px;
  z-index: 1;
}

.datebox>div:nth-child(2) {
  margin-top: 10px;
  width: 120px;
  margin-left: 35px;
}

.z-index-2 {
  z-index: 1;
}

.datelistbox {
  margin-left: 30%;
}

.allDelete {
  position: absolute;
  margin-left: 10%;
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.userIconsBox{
  display: flex;
  flex-direction: row;
  gap:20px;
}
.userDetailsHeader{
  display:flex;
  flex-direction: row;
  gap:15px;
}
.userDetailsList{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:20px;
  margin-left: 10px;
}
.userDetailsList>div{
  width:220px;
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
.editOkButtonBox{
  text-align: center;
  margin-top: 25px;
}

</style>
  

  