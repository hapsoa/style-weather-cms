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

  private numOfSeeMore: number = 28;

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
          this.numOfSeeMore,
        );
        this.clothesGroups = _.concat(
          this.clothesGroups,
          newLoadedClothesGroup,
        );
      } catch (error) {
        alert('마지막 입니다');
      }
    } else {
      // const newLoadedClothesGroup: Cloth[] = await Cloth.loadMultipleByRecent(
      //   3,
      // );
      // this.clothes = _.concat(this.clothes, newLoadedClothesGroup);
      this.$store.dispatch('getClothByQuery', {
        isInit: false,
        searchInput: '',
        majorClass: this.$store.state.majorSelect,
        minorClass: this.$store.state.minorSelect,
      });
    }
  }

  private created() {
    this.$store.state.isMainPage = true; // 툴바 옵션

    // if (this.$store.state.groupOrItem === 'group') {
    ClothesGroup.initNextIndex();
    ClothesGroup.loadMultipleByRecent(this.numOfSeeMore).then(clothesGroups => {
      _.forEach(clothesGroups, clothesGroup => {
        this.clothesGroups.push(clothesGroup);
      });
    });
    // } else {
    // Cloth.initNextIndex();
    // Cloth.loadMultipleByRecent(5).then(clothes => {
    //   _.forEach(clothes, cloth => {
    //     this.clothes.push(cloth);
    //   });
    // });
    this.$store.dispatch('getClothByQuery', {
      isInit: true,
      searchInput: '',
      majorClass: null,
      minorClass: null,
    });
    // }

    // console.log('MAIN CREATED');
  }
  private destroyed() {
    this.$store.state.isMainPage = false;
  }
}
