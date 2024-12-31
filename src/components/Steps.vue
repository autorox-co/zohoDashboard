<template>
  <div class="container mt-4">
    <div class="hh">
      <h3 class="ml-2">Here are the key steps for using the Vue.js application:</h3>
      <ol class="mr-2">
        <li><b>Open the Application:</b> Access the webpage where the Vue app is running.</li>
        <li><b>Select a Branch:</b> Choose a branch from the list to view the workshops associated with it.</li>
        <li><b>Select a Workshop:</b> Choose a workshop from the list to view the customers associated with it.</li>
        <li><b>Search Customers:</b> Use the search bar to find customers by name or status.</li>
        <li><b>Apply Date Filters:</b> Filter customers by Today, Yesterday, This Week, or This Month.</li>
        <li><b>View Customer Details:</b> Click on a customer to see detailed info, including their receipt history (successful and failed payments).</li>
        <li><b>Navigate Pages:</b> Use pagination controls to move between pages of customers.</li>
        <li><b>Close Modal:</b> Close customer details by clicking the "Close" button or clicking outside the modal.</li>
        <li><b>Reset Filters:</b> Clear any applied filters (search or date filters) to view the full customer list.</li>
        <li><b>Monitor Updates:</b> Regularly check for any data updates or changes in customer status.</li>
      </ol>
      <b-button @click="goToHome" variant="primary" class="mt-4">Back</b-button>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "Steps",
  methods: {
    goToHome() {
      this.$router.push({ name: 'App' }); // Navigate back to Home using router.push
    }
  }
}
</script>


<style scoped>
.container {
  line-height: 1.7;
  word-spacing: normal;
  user-select: none;
  height: auto;
}

.hh {
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.mr-2 {
  line-height: auto;
}

button {
  background-color: #007bff; /* Blue color for the button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px; /* Rounded corners */
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
  transform: translateY(-2px); /* Slight lift effect on hover */
}

button:focus {
  outline: none; /* Remove focus outline */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Custom focus outline */
}

button:active {
  background-color: #004085; /* Dark blue when clicked */
  transform: translateY(0); /* Remove lift effect when active */
}

button:disabled {
  background-color: #c6c6c6; /* Gray color for disabled state */
  cursor: not-allowed;
}

button.mt-4 {
  margin-top: 20px;
}
</style>


