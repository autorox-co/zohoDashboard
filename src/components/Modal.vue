<template>
  <b-modal :visible="isModalVisible" @update:visible="handleModalVisibility" aria-labelledby="modal-title" size="xl">
    <h5 class="Zoho-modal-title" id="modal-title">Receipt History for {{ customer.refNumber }}</h5>

    <Alert v-if="errorMessage" :message="errorMessage" :type="errorType" :duration="1900" />

    <b-table :items="paginatedReceipts" :fields="fields" bordered hover class="Zoho-tables">
      <template v-slot:cell(resync)="data">
        <b-button variant="success" @click="syncReceipt(data.item)" :disabled="false">Sync</b-button>
      </template>
    </b-table>

    <div v-if="!receipts || receipts.length === 0">
      <p id="Zoho-receipt"> No receipts found for this customer.</p>
    </div>

    <Pagination v-if="customer && receipts && receipts.length > 0"
      :total-items="receipts.length" :items-per-page="itemsPerPage" :current-page="receiptCurrentPage"
      @page-changed="onReceiptPageChanged" />
     
  </b-modal>
</template>

<script>
import { ref, computed } from 'vue'; 
import axios from 'axios';
import Alert from './Alert.vue'; 

export default {
  name: 'Modal',
  components: {
    Alert
  },
  props: {
    customer: {
      type: Object,
      required: true
    },
    isModalVisible: {
      type: Boolean,
      default: true
    },
    receipts: {
      type: Array,
      required: true
    },
    workshopId:{
      type:String,
      required:true,
    },
    receipt:{
      type:Array,
      required:true,
    }
  },

  setup(props, { emit }) {
    const errorMessage = ref(null); 
    const receiptCurrentPage = ref(1);
    const itemsPerPage = ref(10);
    const errorType = ref('error');
    const fields = [
      { key: 'receiptDate', label: 'Receipt Date' },
      { key: 'message', label: 'Message' },
      { key: 'receiptNumber', label: 'Receipt No' },
      { key: 'resync', label: 'Resync' }
    ];

    const paginatedReceipts = computed(() => {
      if (!props.receipts || props.receipts.length === 0) {
        return [];
      }

      const startIndex = (receiptCurrentPage.value - 1) * itemsPerPage.value;
      return props.receipts.slice(startIndex, startIndex + itemsPerPage.value);
    });

    const handleModalVisibility = (val) => {
      emit('update:isModalVisible', val);
    };

    const onReceiptPageChanged = (newPage) => {
      receiptCurrentPage.value = newPage;
    };

    const syncReceipt = async (receipt) => {
  errorMessage.value = null;
  errorType.value = null;

  try {
    const token = import.meta.env.VITE_API_BEARER_TOKEN;
    if (!token) {
      console.error('No token found in .env file');
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_SYNC_RECEIPTS}?referenceNumber=${receipt.receiptNumber}&workshopId=${props.customer.workshopId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    
    if (response.data.ERROR) {
      errorMessage.value = `Sync failed!\n\nERROR: ${response.data.ERROR}`;
      errorType.value = 'success';  

     
      emit('sync-success', receipt);
    } else {
      
      errorMessage.value = 'Sync Failed!';
      errorType.value = 'danger';  
    }

  } catch (error) {
    console.error('Error syncing customer:', error);
    errorMessage.value = `Sync failed!\n\nERROR: ${error.message}`;
    errorType.value = 'danger';  

    
    emit('sync-success', receipt);
  }
};


    return {
      errorMessage,
      fields,
      errorType,
      receiptCurrentPage,
      itemsPerPage,
      paginatedReceipts,
      handleModalVisibility,
      onReceiptPageChanged,
      syncReceipt
    };
  }
};
</script>  


<style scoped>
.Zoho-modal-title {
  text-align: center;
  margin-bottom: 1rem;
}

.Zoho-tables {
  user-select: none;
}
</style>







