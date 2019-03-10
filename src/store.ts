import Vue from 'vue';
import Vuex from 'vuex';

import { User, ClothesGroup } from '@/api/class';

Vue.use(Vuex);

const initState: {
  isLogin: boolean; // login On/Off
  isMainPage: boolean; // 상단 toolbar 옵션창들 On/Off
  isFullProgress: boolean; // full-screen loading On/Off
  selectedClothesGroup: ClothesGroup | null;
} = {
  isLogin: false,
  isMainPage: false,
  isFullProgress: true,
  selectedClothesGroup: null
};

export default new Vuex.Store({
  state: initState,
  mutations: {},
  actions: {}
});
