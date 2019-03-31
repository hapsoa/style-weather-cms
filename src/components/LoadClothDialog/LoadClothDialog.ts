import { Component, Vue } from 'vue-property-decorator';
import ClothList from '@/components/ClothList/ClothList.vue';

@Component({
  components: {
    ClothList,
  },
})
export default class LoadClothDialog extends Vue {
  private isOpen: boolean = false;
}
