<template>
        <div id="app" class="Zoho-container">
          <div v-if="loading" class="spinner-container">
            <div class="spinner"></div>
          </div>
          <div v-else>
            <div>
              <Filters
                :branches="branches"
                :workshops="workshops"
                :customers="customers"
                :selectedBranchId="selectedBranchId"
                :selectedWorkshops="selectedWorkshops"
                :searchQuery="searchQuery"
                :dateFilter="dateFilter"
                @update:selectedBranchId="updateSelectedBranchId"
                @update:selectedWorkshops="updateSelectedWorkshops"
                @update:searchQuery="updateSearchQuery"
                @update:dateFilter="updateDateFilter"
                @workshop-selected="handleWorkshopSelected"
                @workshop-deselected="handleWorkshopDeselected"/>
            </div>
            <div v-if="selectedWorkshops.length">
              <h3 class="hello mb-3">Failed Invoice Details</h3>
            </div>
            <div v-if="selectedWorkshops.length && customers.length > 0">
              <table-component :customers="pagedCustomers" @view-customer="onViewCustomer" @sync-customer="onSyncCustomer" @remove-customer="removeCustomer" />
              <pagination
                :total-items="customerCount"
                :items-per-page="itemsPerPage"
                :current-page="customerCurrentPage"
                @page-changed="onCustomerPageChanged" />
            </div>
            <modal-component v-if="showModal"
              :customer="selectedCustomer"
              :receipts="receipts"
              :receipt="receiptNumber"
              @close="closeModal"
              @sync-success="removeReceipt"
              @click-outside="handleOutsideClick" />
          </div>
        </div>
      </template>
      
      <script>
      import { ref, computed, watch, onMounted } from 'vue';
      import axios from 'axios';
      import Filters from './Filters.vue';
      import TableComponent from './Table.vue';
      import ModalComponent from './Modal.vue';
      import Pagination from './Pagination.vue';
      
      export default {
        name: "App",
        components: {
          TableComponent,
          ModalComponent,
          Pagination,
          Filters,
        },
        setup() {
          const branches = ref([
            { id: 1, name: 'Branch A' },
            { id: 2, name: 'Branch B' },
            { id: 3, name: 'Branch C' },
            { id: 4, name: 'Branch D' }
          ]);
          const workshops = ref([]);
          const customers = ref([]);
          const selectedBranchId = ref("");
          const selectedWorkshops = ref([]);
          const searchQuery = ref('');
          const dateFilter = ref('all');
          const selectedCustomer = ref(null);
          const showModal = ref(false);
          const itemsPerPage = ref(10);
          const customerCurrentPage = ref(1);
          const receipts = ref([]);
          const referenceNumber = ref([]);
          const loading = ref(false);
      
          const fetchWorkshops = async () => {
            if (!selectedBranchId.value) {
              workshops.value = [];
              return;
            }
            try {
              const token = import.meta.env.VITE_API_BEARER_TOKEN;
              if (!token) {
                console.error('No token found in .env file');
                return;
              }
              const response = await axios.get(import.meta.env.VITE_APP_API_URL, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              const apiData = response.data.data;
              if (apiData) {
                workshops.value = apiData.map(workshop => ({
                  id: workshop.workshopId,
                  name: workshop.name,
                }));
              }
            } catch (error) {
              console.error('Error fetching workshops:', error);
            }
          };
      
          const fetchCustomers = async (workshopId) => {
            if (!workshopId) {
              return [];
            }
            try {
              loading.value = true;
              const token = import.meta.env.VITE_API_BEARER_TOKEN;
              if (!token) {
                console.error('No token found in .env file');
                loading.value = false;
                return [];
              }
              const response = await axios.get(import.meta.env.VITE_APP_API_CUSTOMER, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                params: {
                  workshopId: workshopId,
                },
              });
              const apiData = response.data.data;
              loading.value = false;
              return apiData.map((customer, index) => ({
                id: customers.value.length + index + 1,
                apiResponse: customer.apiResponse,
                sequenceNumber: customer.sequenceNumber,
                createdAt: customer.createdAt,
                refNumber: customer.ref_numbers,
                workshopId: workshopId,
              }));
            } catch (error) {
              console.error('Error fetching customers:', error);
              loading.value = false;
              return [];
            }
          };
      
          const handleWorkshopSelected = async (workshopId) => {
            console.log('Workshop selected:', workshopId); 
            const newCustomers = await fetchCustomers(workshopId);
            customers.value = [...customers.value, ...newCustomers];
          };
         
      
          const handleWorkshopDeselected = (workshopId) => {
            customers.value = customers.value.filter(customer => customer.workshopId !== workshopId);
          };
      
          const updateSelectedBranchId = (newBranchId) => {
            selectedBranchId.value = newBranchId;
            selectedWorkshops.value = [];
            customers.value = [];
            fetchWorkshops();
          };
      
          const updateSelectedWorkshops = (newWorkshops) => {
            selectedWorkshops.value = newWorkshops;
          };
      
          const updateSearchQuery = (newSearchQuery) => {
            searchQuery.value = newSearchQuery;
          };
      
          const updateDateFilter = (newDateFilter) => {
            dateFilter.value = newDateFilter;
          };
      
          const filteredCustomers = computed(() => {
            return customers.value.filter(customer => {
              const matchesSearch = !searchQuery.value || customer.refNumber.toString().includes(searchQuery.value);
              const matchesDateFilter = applyDateFilter(customer.createdAt);
              return matchesSearch && matchesDateFilter;
            });
          });
          
      
          const customerCount = computed(() => filteredCustomers.value.length);
      
          const pagedCustomers = computed(() => {
            const start = (customerCurrentPage.value - 1) * itemsPerPage.value;
            return filteredCustomers.value.slice(start, start + itemsPerPage.value);
          });
      
          const applyDateFilter = (date) => {
            const today = new Date();
            const customerDate = new Date(date);
            switch (dateFilter.value) {
              case 'today':
                return customerDate.toDateString() === today.toDateString();
              case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return customerDate.toDateString() === yesterday.toDateString();
              case 'this_week':
                const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                return customerDate >= startOfWeek;
              case 'this_month':
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                return customerDate >= startOfMonth;
              default:
                return true;
            }
          };
      
          const onCustomerPageChanged = (newPage) => {
            if (newPage <= totalPages.value && newPage >= 1) {
              customerCurrentPage.value = newPage;
            }
          };
      
          watch([searchQuery, dateFilter], () => {
            customerCurrentPage.value = 1;
          });
      
          const totalPages = computed(() => Math.ceil(customerCount.value / itemsPerPage.value));
      
          const onViewCustomer = async (customer) => {
            if (showModal.value) {
              referenceNumber.value = [];
              closeModal();
            } else {
              selectedCustomer.value = customer;
              showModal.value = true;
            }
            try {
              const token = import.meta.env.VITE_API_BEARER_TOKEN;
              const response = await axios.get(import.meta.env.VITE_APP_API_RECEIPT, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                params: {
                  workshopId: customer.workshopId,
                  referenceNumber: customer.refNumber
                },
              });
              const apiData = response.data.data;
              receipts.value = apiData.map(receipt => ({
                receiptNumber: receipt.receiptNumber,
                receiptDate: receipt.receiptDate,
                message: receipt.message,
              }));
            } catch (error) {
              console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
          };
      
          const toggleModal = () => {
            showModal.value = !showModal.value;
            if (showModal.value) {
              selectedCustomer.value = null;
            }
          };
      
          const closeModal = () => {
            showModal.value = false;
            selectedCustomer.value = null;
          };
      
          const handleOutsideClick = () => {
            if (showModal.value && !event.target.closest('.modal-container')) {
              closeModal();
            }
          };
      
          const onSyncCustomer = (customer) => {
            console.log('Syncing customer data:', customer);
          };
      
          const removeCustomer = (customerId) => {
            customers.value = customers.value.filter(customer => customer.id !== customerId);
            customerCurrentPage.value = 1;
          };
      
          const removeReceipt = (receipt) => {
            receipts.value = receipts.value.filter(item => item.receiptNumber !== receipt.receiptNumber);
          };
      
          onMounted(() => {
            fetchWorkshops();
          });
      
          return {
            removeCustomer,
            removeReceipt,
            receipts,
            branches,
            workshops,
            customers,
            selectedBranchId,
            selectedWorkshops,
            searchQuery,
            dateFilter,
            updateSelectedBranchId,
            updateSelectedWorkshops,
            filteredCustomers,
            pagedCustomers,
            updateSearchQuery,
            updateDateFilter,
            onCustomerPageChanged,
            onViewCustomer,
            onSyncCustomer,
            closeModal,
            handleOutsideClick,
            showModal,
            selectedCustomer,
            applyDateFilter,
            itemsPerPage,
            customerCurrentPage,
            toggleModal,
            customerCount,
            handleWorkshopSelected,
            handleWorkshopDeselected,
            loading
          };
        },
      };
      </script>
<style scoped>
.Zoho-container {
  background-color: #fff;
   width: 95%; 
  max-width: 3000px; 
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:   0.35rem 0.2rem 0.35rem 0.35rem rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 10px;
  user-select: none;
}

.spinner {
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #3498db; 
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
  display: block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

</style> 

















