import Vue from 'vue';
import Vuex from 'vuex';

import { User, ClothesGroup } from '@/api/class';

Vue.use(Vuex);

const initState: {
  isLogin: boolean; // login On/Off
  isMainPage: boolean; // 상단 toolbar 옵션창들 On/Off
  isFullProgress: boolean; // full-screen loading On/Off
  selectedClothesGroup: ClothesGroup | null;
  groupOrItem: string;
} = {
  isLogin: false,
  isMainPage: false,
  isFullProgress: true,
  selectedClothesGroup: null,
  groupOrItem: 'group',
};

export default new Vuex.Store({
  state: initState,
  mutations: {
    // groupOrItem 변경
    convertGroup(state) {
      state.groupOrItem = 'group';
    },
    // groupOrItem 변경
    convertItem(state) {
      state.groupOrItem = 'item';
    },
  },
  actions: {},
});
