<template>
    <div class="Menubar ">


        <!-- Download  -->

        <span>
            {{ getDataLength }} orders
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-down" @click="handleExportMethod" style="color: #4980df;"
                class="DownloadIcon" />
        </span>

        <!-- Search box & Refresh Icon -->


        <span :class="listboxShow  ? 'p-input-icon-left bgChange' : 'p-input-icon-left'">

            <!-- Search Bar -->

            <SearchBar @handle-search-method="handleSearch" />

            <!-- Refresh  -->

            <font-awesome-icon icon="fa-solid fa-arrows-rotate" class="rotateIcon" spin style="color: #4980df;"
                v-if="spin" />

            <font-awesome-icon icon="fa-solid fa-arrows-rotate" class="rotateIcon" v-if="!spin"
                @click="$emit('handle-refresh-method')" />

        </span>



        <div class="listbox">
            <div>
                <font-awesome-icon icon="fa-solid fa-list" class="listIcon" style="color: #4980df;" @click="$emit('handle-filter-by-cylinder')" />
            </div>
            <div v-show="listboxShow">
                <Listbox v-model="selectedCylinder" :options="cylinderList" optionLabel="name" class="w-full md:w-14rem " />
            </div>
        </div>

        <div class="datebox">
            <div>
                <font-awesome-icon icon="fa-solid fa-calendar-days" style="color: #4980df;cursor: pointer;"  />
            </div>
            <div >
                <!-- <Listbox v-model="selectedDate" :options="dateList" optionLabel="name" class="w-full md:w-14rem "
                    @click="checkData" /> -->
            </div>
        </div>


        <div class="allDelete">
            <div >
                <Button label="Delete" style="height:35px" severity="danger" ></Button>
            </div>

        </div>


    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import Button from 'primevue/button';
import { useDataTableStore } from "@/stores/dataTable"
import { ref } from 'vue';
import SearchBar from './SearchBar.vue';
export default {
    components: {
        InputText,
        Listbox,
        Button,
        SearchBar
    },
    props: {
        getDataLength: Number,
        spin: Boolean,
        listboxShow:Boolean
    },
    data() {
        return {
            bgShow: false,
            cylinderList: ([
                {
                    name: '1 Cylinder',
                    code: "1"
                },
                {
                    name: '2 Cylinder',
                    code: '2'
                },
                {
                    name: '3 Cylinder',
                    code: '3'
                },
                {
                    name: '4 Cylinder',
                    code: '4'
                },
                {
                    name: '5 Cylinder',
                    code: '5'
                },
                {
                    name: '6 Cylinder',
                    code: '6'
                }
            ]),
            selectedCylinder:[]
        }
    },
    setup() {
        const dataTableStore = useDataTableStore();
        const search = ref(dataTableStore.search)



        return {
            dataTableStore,
            search,
        }
    },
    watch: {
        selectedCylinder(){
            this.$emit('handle-filter-by-cylinder',this.selectedCylinder.code)
        }
    },
    methods: {
        handleExportMethod() {
            this.$emit('handle-export-method')
        },
        handleSearch() {

            this.$emit('handle-search-method', this.dataTableStore.search)
        },
        reset(data) {

            console.log(search, data)
        }
    },
    updated() {
        this.handleSearch();
    }

}

</script>

<style scoped>
.Menubar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.DownloadIcon {
    font-size: 35px;
    margin-left: 15px;
    cursor: pointer;
    position: relative;
    top: 5px;
}

.rotateIcon {
    margin-left: 25px;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
}
</style>