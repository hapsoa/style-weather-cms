import { Component, Vue, Watch } from 'vue-property-decorator';
import { ClothesGroup, Cloth } from '@/api/class';
import _ from 'lodash';
import ClothList from '@/components/ClothList/ClothList.vue';
import ClothListTs from '@/components/ClothList/ClothList.ts';

@Component({
  components: { ClothList },
})
export default class ClothesGroupDetail extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    clothList: ClothListTs;
  };

  public clothesGroup: ClothesGroup | null = null;
  public clothesGroupTableData: Array<{
    name: string;
    content: any;
  }> = [];

  public async deleteClothesGroup() {
    if (!_.isNil(this.clothesGroup)) {
      await this.clothesGroup.delete();
      this.$router.go(-1);
    }
  }

  @Watch('clothesGroup', { deep: true })
  public clothesGroupChanged(value: number, oldValue: number) {
    if (
      !_.isNil(this.$refs.clothList) &&
      _.isNil(this.$refs.clothList.clickClothListener)
    ) {
      this.$refs.clothList.setClickClothListener((cloth: Cloth) => {
        this.$router.push({
          name: 'cloth-detail',
          params: {
            id: cloth.id,
          },
        });
      });
    }
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
