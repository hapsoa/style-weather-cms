import Vue from 'vue';
import Vuex from 'vuex';

import { User } from '@/api/class';

Vue.use(Vuex);

const initState: {
  isLogin: boolean;
  isMainPage: boolean;
  isFullProgress: boolean;
} = {
  isLogin: false,
  isMainPage: false,
  isFullProgress: true
};

export default new Vuex.Store({
  state: initState,
  mutations: {},
  actions: {}
});
