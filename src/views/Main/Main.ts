import { Component, Vue } from 'vue-property-decorator';
import { ClothesGroup, Cloth } from '@/api/class';
import _ from 'lodash';

@Component({
  components: {},
})
export default class Main extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {};

  private clothesGroups: ClothesGroup[] = [];
  private clothes: Cloth[] = [];

  public goDetailView() {
    console.log('goDetailView()');
  }

  private created() {
    this.$store.state.isMainPage = true; // 툴바 옵션

    ClothesGroup.initNextIndex();
    ClothesGroup.loadMultipleByRecent(10).then(clothesGroups => {
      _.forEach(clothesGroups, clothesGroup => {
        this.clothesGroups.push(clothesGroup);
      });
    });
    Cloth.initNextIndex();
    Cloth.loadMultipleByRecent(10).then(clothes => {
      _.forEach(clothes, cloth => {
        this.clothes.push(cloth);
      });
    });
    console.log('MAIN CREATED');
  }
}
