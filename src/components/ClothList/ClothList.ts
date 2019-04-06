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
  @Prop({
    type: Boolean,
    default: false,
  })
  public canSelectHighlight!: boolean;
  @Prop({
    type: Boolean,
    default: false,
  })
  public canHoverHighlight!: boolean;

  public clickClothListener: ((cloth: Cloth) => void) | null = null;

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
  public clickCloth(clickedCloth: Cloth) {
    if (!_.isNil(this.clickClothListener)) {
      this.clickClothListener(clickedCloth);
    }
    if (this.canSelectHighlight) {
      this.highlightCloth(clickedCloth);
    }
  }
  public highlightCloth(clickedCloth: Cloth) {
    if (!_.isNil(this.clothList)) {
      _.forEach(this.clothList, (cloth: Cloth) => {
        this.$set(cloth, 'selected', false);
      });
      this.$set(clickedCloth, 'selected', true);
    }
  }
}
