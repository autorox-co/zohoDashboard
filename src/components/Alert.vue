<template>
  <div v-if="visible" :class="['alert', alertType]" role="alert">
    <span class="alert-message">{{ message }}</span>
    <button class="close-btn" @click="closeAlert">×</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 1900
    }
  },
  setup(props) {
    const visible = ref(true); 
    const alertType = computed(() => {
      return `alert-${props.type}`;
    });
    const closeAlert = () => {
      visible.value = false;
    };
    onMounted(() => {
      setTimeout(() => {
        closeAlert();
      }, props.duration);
    });

    return {
      visible,
      alertType,
      closeAlert
    };
  }
};
</script>

<style scoped>
.alert {
  max-height: 100px;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  box-sizing: border-box;
}

.alert-message {
  flex: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.alert-success {
  background-color: #4CAF50;
  color: white;
  height:10px;
  text-align:center;
  font-size:15px;
}

.alert-error {
  background-color: #f44336;
  color: white;
  height:40px;
  font-size:12px;
  text-align: center;
}

.alert-info {
  background-color: #2196F3;
  color: white;
}

.alert-warning {
  background-color: #ff9800;
  color: white;
}
</style>

