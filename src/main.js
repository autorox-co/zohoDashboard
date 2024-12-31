import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import Table from './components/Table.vue';
import Pagination from './components/Pagination.vue';
import Modal from './components/Modal.vue';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import Filters from './components/Filters.vue';
import { BModal, BButton, BTable, BPagination, BFormSelect, BFormInput,BAlert,BDropdown } from 'bootstrap-vue-next';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';  // Correct BootstrapVueNext CSS import
import  Alert  from './components/Alert.vue';


const app = createApp(App);

app.component('BModal', BModal);
app.component('BButton', BButton);
app.component('BTable', BTable);
app.component('BPagination', BPagination);
app.component('BFormSelect', BFormSelect);
app.component('BFormInput', BFormInput);
app.component('BAlert',BAlert)
app.component('BDropdown',BDropdown)


app.component('Table', Table);
app.component('Pagination', Pagination);
app.component('Modal', Modal);
app.component('Filters', Filters);
app.component('Alert', Alert);


// Mount the app
app.mount('#app');

