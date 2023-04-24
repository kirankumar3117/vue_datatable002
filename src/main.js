import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import VTooltip from "v-tooltip";
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import "./assets/global.css"
//core
import "primevue/resources/primevue.min.css";

//icons
import "primeicons/primeicons.css";

//font awsome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faCirclePlus,faCloudArrowDown,faList,faArrowsRotate,faCalendarDays,faTrashCan, faEye, faUserPen, faTrash, faCircleUser, faCircleExclamation} from "@fortawesome/free-solid-svg-icons"

library.add(faCirclePlus,faCloudArrowDown,faList,faArrowsRotate,faCalendarDays,faTrashCan,faEye,faUserPen,faTrash,faCircleUser,faCircleExclamation)


const pinia=createPinia();

createApp(App).use(pinia).component('font-awesome-icon', FontAwesomeIcon).use(ToastService).use(ConfirmationService).use(PrimeVue).use(VTooltip).use(router).mount('#app')
