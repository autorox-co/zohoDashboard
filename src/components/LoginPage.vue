
<template>
  <div class="zoho-login-container">
    <div class="zoho-login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="zoho-form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="zoho-form-group">
          <label for="token">Token</label>
          <input
            type="text"
            id="token"
            v-model="token"
            placeholder="Enter your token"
            required
          />
        </div>
        <button type="submit" class="zoho-btn-submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      token: "",
    };
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.token) {
        alert("Please fill in all fields");
        return;
      }
      // Add login logic here
      alert(`Logged in as ${this.username} with token ${this.token}`);
    },
  },
};
</script>

<style scoped>
/* Container styling */
.zoho-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

/* Login box styling */
.zoho-login-box {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Title styling */
.zoho-login-box h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Form styling */
.zoho-form-group {
  margin-bottom: 15px;
  text-align: left;
}

.zoho-form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
}

.zoho-form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.zoho-form-group input:focus {
  border-color: #0056b3;
}

/* Button styling */
.zoho-btn-submit {
  width: 100%;
  padding: 10px 15px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.zoho-btn-submit:hover {
  background-color: #003d80;
}
/* test */
</style>
