<template>
  <div class="Zoho-pagination">
    <button 
      :disabled="currentPage === 1" 
      @click="goToPage(currentPage - 1)"
      aria-label="Go to previous page"
      class="Zoho-pagination-button"
    >
      <span class="Zoho-pagination-arrow">&laquo;</span>
    </button>

    <button 
      v-for="page in pageNumbers" 
      :key="page"
      :disabled="page === currentPage"
      @click="goToPage(page)"
      class="Zoho-pagination-button"
      :class="{'active': page === currentPage}"
      aria-label="Go to page {{ page }}"
    >
      {{ page }}
    </button>

    <button 
      :disabled="currentPage === totalPages" 
      @click="goToPage(currentPage + 1)"
      aria-label="Go to next page"
      class="Zoho-pagination-button"
    >
      <span class="Zoho-pagination-arrow">&raquo;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: Number,
    itemsPerPage: Number,
    currentPage: Number
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pageNumbers() {
      let numbers = [];
      for (let i = 1; i <= this.totalPages; i++) {
        numbers.push(i);
      }
      return numbers;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    }
  }
};
</script>

<style scoped>
.Zoho-pagination {
  display: flex;
  justify-content: right;
  gap: 0.5rem;
  align-items: center;
}

.Zoho-pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 50px;
  background-color: white;
  color:  blue;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.Zoho-pagination-button.active {
  background-color: blue;
  color: white;
}

.Zoho-pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.Zoho-pagination-arrow {
  font-size: 1.25rem;
}
</style>
