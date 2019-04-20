import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import { User, ClothesGroup, Cloth } from '@/api/class';
import { MajorClass } from './api/class/Cloth';

Vue.use(Vuex);

const initState: {
  isLogin: boolean; // login On/Off
  isMainPage: boolean; // 상단 toolbar 옵션창들 On/Off
  isFullProgress: boolean; // full-screen loading On/Off
  selectedClothesGroup: ClothesGroup | null;
  groupOrItem: string;
  clothList: Cloth[];
} = {
  isLogin: false,
  isMainPage: false,
  isFullProgress: true,
  selectedClothesGroup: null,
  groupOrItem: 'group',
  clothList: [],
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
  actions: {
    async getClothByQuery(
      store,
      payload: {
        isInit: boolean;
        searchInput: string;
        majorClass: MajorClass;
        minorClass: string;
      },
    ) {
      if (payload.isInit) {
        Cloth.initNextIndex();
        store.state.clothList = await Cloth.getByQuery({
          numOfClothes: 3,
          searchInput: payload.searchInput,
          majorClass: payload.majorClass,
          minorClass: payload.minorClass,
        });
      } else {
        const newLoadedClothes = await Cloth.getByQuery({
          numOfClothes: 3,
          searchInput: payload.searchInput,
          majorClass: payload.majorClass,
          minorClass: payload.minorClass,
        });
        store.state.clothList = _.concat(
          store.state.clothList,
          newLoadedClothes,
        );
      }
    },
  },
});
