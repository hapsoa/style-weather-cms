import { Component, Vue } from 'vue-property-decorator';
import { ClothesGroup, Cloth } from '@/api/class';
import _ from 'lodash';

@Component({
  components: {},
})
export default class ClothesGroupDetail extends Vue {
  public clothesGroup: ClothesGroup | null = null;
  public clothesGroupTableData: Array<{
    name: string;
    content: any;
  }> = [];

  public goClothDetail(clothId: string) {
    this.$router.push({
      name: 'cloth-detail',
      params: {
        id: clothId,
      },
    });
  }

  private async created() {
    this.clothesGroup = await ClothesGroup.load(this.$route.params.id);

    const promises: Array<Promise<Cloth>> = [];

    _.forEach(this.clothesGroup.clothIds, clothId => {
      promises.push(Cloth.load(clothId));
    });

    Promise.all(promises)
      .then(clothes => {
        _.forEach(clothes, cloth => {
          if (!_.isNil(cloth.majorClass) && !_.isNil(this.clothesGroup)) {
            this.clothesGroup.clothes[cloth.majorClass] = cloth;
          } else {
            throw new Error('오.. cloth 불러오다가 에러가..');
          }
        });
      })
      .catch(e => console.error('cloth들을 가져오다가 에러남', e));

    console.log('this.clothesGroup', this.clothesGroup);

    this.clothesGroupTableData.push({
      name: '그룹 제목',
      content: this.clothesGroup.name,
    });
    this.clothesGroupTableData.push({
      name: 'id',
      content: this.clothesGroup.id,
    });
  }
}
