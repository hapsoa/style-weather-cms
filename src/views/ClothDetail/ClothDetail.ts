import { Component, Vue } from 'vue-property-decorator';
import { Cloth } from '@/api/class';
import { ClothData } from '@/api/class/Cloth';
import _ from 'lodash';

@Component({
  components: {},
})
export default class ClothDetail extends Vue {
  public desserts = [
    {
      name: '그룹 제목',
      calories: '봄 코디임',
    },
    {
      name: 'id',
      calories: 'qjpowtijqnt209',
    },
  ];

  public cloth: Cloth | null = null;
  public clothTableData: Array<{
    name: string;
    content: any;
  }> = [];

  private async created() {
    this.cloth = await Cloth.load(this.$route.params.id);

    console.log('this.cloth', this.cloth);

    const parsedCloth = JSON.parse(JSON.stringify(this.cloth));
    _.forEach(parsedCloth, (value, key) => {
      if (!_.isNil(value) && typeof value !== 'boolean') {
        // console.log(key, value, typeof value);
        this.clothTableData.push({
          name: key,
          content: value,
        });
      }
    });
  }
}
