import Vue from 'vue';
import Vuex from 'vuex';

import { User } from '@/api/class';

Vue.use(Vuex);

const initState: {
  user: User | null;
} = {
  user: null
};

export default new Vuex.Store({
  state: initState,
  mutations: {},
  actions: {}
});
