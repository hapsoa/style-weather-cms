import { Component, Vue } from 'vue-property-decorator';
import { Cloth } from '@/api/class';
import { ClothData } from '@/api/class/Cloth';
import _ from 'lodash';
import { fbClothesGroupApi } from '@/api/firebase';

@Component({
  components: {},
})
export default class ClothDetail extends Vue {
  private cloth: Cloth | null = null;
  private clothTableData: Array<{
    name: string;
    content: any;
  }> = [];

  public async deleteCloth() {
    if (!_.isNil(this.cloth)) {
      // 해당하는 cloth를 가진 clothesGroup이 없어야 삭제한다.
      // const hasClothesGroupsHavingCloth: boolean = await fbClothesGroupApi.db.checkClothesGroupsHavingCloth();
      this.cloth.delete();
      this.$router.go(-1);
    }
  }

  private async created() {
    this.cloth = await Cloth.load(this.$route.params.id);

    console.log('this.cloth', this.cloth);

    // const parsedCloth = JSON.parse(JSON.stringify(this.cloth));
    // _.forEach(parsedCloth, (value, key) => {
    //   if (!_.isNil(value) && typeof value !== 'boolean') {
    //     // console.log(key, value, typeof value);
    //     this.clothTableData.push({
    //       name: key,
    //       content: value,
    //     });
    //   }
    // });
    _.forEach(this.cloth.data, (value, key) => {
      this.clothTableData.push({
        name: key,
        content: value,
      });
    });
  }
}
