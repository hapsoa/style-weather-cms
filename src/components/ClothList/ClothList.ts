import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Cloth } from '@/api/class';
import { ClothesHash } from '@/api/class/ClothesGroup';
import { MajorClass } from '@/api/class/Cloth';

@Component({})
export default class ClothList extends Vue {
  // @Prop({ required: true }) public clothesGroup!: ClothesGroup | null;
  @Prop({
    type: [Object as () => ClothesHash | null, Array as () => Cloth[] | null],
    required: true,
  })
  public clothList!: Cloth[] | ClothesHash | null;

  public clickClothListener: ((cloth: Cloth) => void) | null = null;
  // @Prop({ type: Object as () => ClothesHash, default: null })
  // public clothesHash!: ClothesHash | null;

  @Watch('clothList', { deep: true })
  public clothListChanged(
    value: Cloth[] | ClothesHash | null,
    oldValue: Cloth[] | ClothesHash | null,
  ) {
    console.log('clothlist watch changed');
  }
  public forceUpdate() {
    this.$forceUpdate();
  }

  public setClickClothListener(listener: (cloth: Cloth) => void) {
    this.clickClothListener = listener;
  }
  public clickCloth(cloth: Cloth) {
    if (!_.isNil(this.clickClothListener)) {
      this.clickClothListener(cloth);
    }
  }
}
