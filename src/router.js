// import { createRouter, createWebHistory } from 'vue-router';

// import Steps from './components/Steps.vue';
// import { componentNames } from 'bootstrap-vue-next';
// import App from './components/App.vue';
// const routes = [
  
//   {
//     path: '/',
//     name: 'App',
//     component: App, // Route for Home component
//   },
//   {
//     path: '/steps',
//     name: 'Steps',
//     component: Steps, // Route for About component
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
// });

// export default router;



import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';

//import Steps from './components/Steps.vue';

const routes = [
  {
    path: '/',
    name: 'App',
    //component: App,
  },
  {
    // path: '/steps',
    // name: 'Steps',
    // component: Steps,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

