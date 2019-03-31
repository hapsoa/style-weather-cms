import { Component, Vue, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { ClothesGroup } from '@/api/class';

@Component({})
export default class ClothList extends Vue {
  @Prop({ required: true }) public clothesGroup!: ClothesGroup | null;

  private clickClothListener: ((clothId: string) => void) | null = null;
  public setClickClothListener(listener: (clothId: string) => void) {
    this.clickClothListener = listener;
  }
  public clickCloth(clothId: string) {
    if (!_.isNil(this.clickClothListener)) {
      this.clickClothListener(clothId);
    }
  }
}
