import { Component, Vue } from 'vue-property-decorator';
import { ClothesGroup, Cloth } from '@/api/class';
import _ from 'lodash';

@Component({
  components: {},
})
export default class Main extends Vue {
  public $refs!: {};

  private clothesGroups: ClothesGroup[] = [];
  private clothes: Cloth[] = [];

  public goClothesGroupDetail(clothesGroupId: string) {
    this.$router.push({
      name: 'clothesgroup-detail',
      params: {
        id: clothesGroupId,
      },
    });
  }
  public goClothDetail(clothId: string) {
    console.log('goDetailView()');
    this.$router.push({
      name: 'cloth-detail',
      params: {
        id: clothId,
      },
    });
  }
  public async seeMore() {
    if (this.$store.state.groupOrItem === 'group') {
      try {
        const newLoadedClothesGroup: ClothesGroup[] = await ClothesGroup.loadMultipleByRecent(
          3,
        );
        this.clothesGroups = _.concat(
          this.clothesGroups,
          newLoadedClothesGroup,
        );
      } catch (error) {
        alert('마지막 입니다');
      }
    } else {
      try {
        const newLoadedClothesGroup: Cloth[] = await Cloth.loadMultipleByRecent(
          3,
        );
        this.clothes = _.concat(this.clothes, newLoadedClothesGroup);
      } catch (error) {
        alert('마지막 입니다');
      }
    }
  }

  private created() {
    this.$store.state.isMainPage = true; // 툴바 옵션

    ClothesGroup.initNextIndex();
    ClothesGroup.loadMultipleByRecent(3).then(clothesGroups => {
      _.forEach(clothesGroups, clothesGroup => {
        this.clothesGroups.push(clothesGroup);
      });
    });
    Cloth.initNextIndex();
    Cloth.loadMultipleByRecent(5).then(clothes => {
      _.forEach(clothes, cloth => {
        this.clothes.push(cloth);
      });
    });
    console.log('MAIN CREATED');
  }
  private destroyed() {
    this.$store.state.isMainPage = false;
  }
}
