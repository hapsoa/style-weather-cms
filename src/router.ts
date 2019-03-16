import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Main from './views/Main/Main.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
    },
    // {
    //   path: '/group-creation/:clothesGroupId',
    //   name: 'group-creation',
    //   component: () => import('./views/GroupCreation/GroupCreation.vue')
    // },
    {
      path: '/group-creation',
      name: 'group-creation',
      component: () => import('./views/GroupCreation/GroupCreation.vue'),
    },
    {
      path: '/group/:id',
      name: 'group-view',
      component: () => import('./views/Login/Login.vue'),
    },
    {
      path: '/upload-file-test',
      name: 'upload-file-test',
      component: () => import('./views/test/UploadFile/UploadFileTest.vue'),
    },
  ],
});
