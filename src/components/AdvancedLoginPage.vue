<!-- <template>
  <div class="zoho-login-container">
    <div class="zoho-login-box">
      <div class="zoho-login-header">
        <h2>Welcome</h2>
        <p>Please login to your account</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="zoho-form-group">
          <label for="username">Username</label>
          <div class="zoho-input-wrapper">
            <i class="zoho-icon zoho-user-icon"></i>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div class="zoho-form-group">
          <label for="token">Token</label>
          <div class="zoho-input-wrapper">
            <i class="zoho-icon zoho-token-icon"></i>
            <input
              type="password"
              id="token"
              v-model="token"
              placeholder="Enter your token"
              required
            />
          </div>
        </div>
        <button type="submit" class="zoho-btn-submit">Login</button>
      </form>
      <div class="zoho-login-footer">
        <p>Forgot your token? <a href="#">Reset it here</a></p>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedLoginPageVue",
  data() {
    return {
      username: '',
      token: '',
      validLogins: [
      { username: 'Rajesh', token: '123456' },
      { username: 'Phenna', token: '67890' },
      { username: 'Praveen', token: '54321' }
    ]
    };
  },
  methods: {
    handleLogin() {
    const isValid = this.validLogins.some(login => login.username === this.username && login.token === this.token);
    if (isValid) {
      this.$emit('login-success');
    } else {
      alert("Invalid username or token");
    }
  },
},
};
</script> -->
<template>
  <div class="zoho-login-container">
    <div class="zoho-login-box">
      <div class="zoho-login-header">
        <h2>Welcome</h2>
        <p>Please login to your account</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="zoho-form-group">
          <label for="username">Username</label>
          <div class="zoho-input-wrapper">
            <i class="zoho-icon zoho-user-icon"></i>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>
        <div class="zoho-form-group">
          <label for="token">Token</label>
          <div class="zoho-input-wrapper">
            <i class="zoho-icon zoho-token-icon"></i>
            <input
              type="password"
              id="token"
              v-model="token"
              placeholder="Enter your token"
              required
            />
          </div>
        </div>
        <button type="submit" class="zoho-btn-submit">Login</button>
      </form>
      <div class="zoho-login-footer">
        <p>Forgot your token? <a href="#">Reset it here</a></p>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdvancedLoginPageVue",
  data() {
    return {
      username: '',
      token: '',
      validLogins: [] 
    };
  },
  created() {
   
    this.validLogins = [
      { username: import.meta.env.VITE_USERNAME_1, token: import.meta.env.VITE_TOKEN_1 },
      { username: import.meta.env.VITE_USERNAME_2, token: import.meta.env.VITE_TOKEN_2 },
      { username: import.meta.env.VITE_USERNAME_3, token: import.meta.env.VITE_TOKEN_3 }
    ];

    
    console.log(import.meta.env); 
  },
  methods: {
    handleLogin() {
      const isValid = this.validLogins.some(
        login => login.username === this.username && login.token === this.token
      );

      if (isValid) {
        this.$emit('login-success');
      } else {
        alert("Invalid username or token");
      }
    }
  }
};
</script>


<style scoped>
/* Container styling */
.zoho-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
}

/* Login box styling */
.zoho-login-box {
  width: 100%;
  max-width: 400px;
  background: #fff;
  color: #333;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

/* Header styling */
.zoho-login-header h2 {
  margin-bottom: 10px;
  font-size: 28px;
}

.zoho-login-header p {
  font-size: 14px;
  color: #666;
}

/* Form styling */
.zoho-form-group {
  margin-bottom: 20px;
  text-align: left;
}

.zoho-form-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

.zoho-input-wrapper {
  position: relative;
}

.zoho-input-wrapper input {
  width: 100%;
  padding: 10px 40px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

.zoho-input-wrapper input:focus {
  border-color: #0056b3;
}

.zoho-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #666;
}

.zoho-user-icon::before {
  content: "\1F464"; /* Unicode for user icon */
}

.zoho-token-icon::before {
  content: "\1F510"; /* Unicode for lock icon */
}

/* Button styling */
.zoho-btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.zoho-btn-submit:hover {
  background-color: #003d80;
}

/* Footer styling */
.zoho-login-footer {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.zoho-login-footer a {
  color: #0056b3;
  text-decoration: none;
}

.zoho-login-footer a:hover {
  text-decoration: underline;
}
</style>
