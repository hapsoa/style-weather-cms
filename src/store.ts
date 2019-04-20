import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import { User, ClothesGroup, Cloth } from '@/api/class';

Vue.use(Vuex);

const initState: {
  isLogin: boolean; // login On/Off
  isMainPage: boolean; // 상단 toolbar 옵션창들 On/Off
  isFullProgress: boolean; // full-screen loading On/Off
  selectedClothesGroup: ClothesGroup | null;
  groupOrItem: string;
  clothes: Cloth[];
  majorSelect: string;
  minorSelect: string | null;
} = {
  isLogin: false,
  isMainPage: false,
  isFullProgress: true,
  selectedClothesGroup: null,
  groupOrItem: 'group',
  clothes: [],
  majorSelect: 'All',
  minorSelect: null,
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
        majorClass: string | null;
        minorClass: string | null;
      },
    ) {
      let queryMajorClass: string | null = null;
      if (payload.majorClass !== 'All') {
        queryMajorClass = payload.majorClass;
      }
      let queryMinorClass: string | null = null;
      if (payload.majorClass !== 'All') {
        queryMinorClass = payload.majorClass;
      }
      if (payload.isInit) {
        Cloth.initNextIndex();
        store.state.clothes = await Cloth.getByQuery({
          numOfClothes: 3,
          searchInput: payload.searchInput,
          majorClass: queryMajorClass,
          minorClass: queryMinorClass,
        });
      } else {
        try {
          const newLoadedClothes = await Cloth.getByQuery({
            numOfClothes: 3,
            searchInput: payload.searchInput,
            majorClass: queryMajorClass,
            minorClass: queryMinorClass,
          });
          store.state.clothes = _.concat(store.state.clothes, newLoadedClothes);
        } catch (error) {
          alert('마지막 입니다');
        }
      }
    },
  },
});
