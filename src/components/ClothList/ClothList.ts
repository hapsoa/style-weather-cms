import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import { Cloth } from '@/api/class';
import { ClothesHash } from '@/api/class/ClothesGroup';
import { MajorClass } from '@/api/class/Cloth';

@Component({})
export default class ClothList extends Vue {
  get realClothList() {
    if (!_.isNil(this.clothList)) {
      console.log(
        'qqqq',
        _.filter(this.clothList, (cloth: Cloth) => !_.isNil(cloth)),
      );
      return _.filter(this.clothList, (cloth: Cloth) => !_.isNil(cloth));
    } else {
      return [];
    }
  }
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
  @Prop({
    type: Boolean,
    default: false,
  })
  public canSeeMore!: boolean;

  public clickClothListener: ((cloth: Cloth) => void) | null = null;
  private seeMoreListener: (() => void) | null = null;

  @Watch('clothList', { deep: true })
  public clothListChanged(
    value: Cloth[] | ClothesHash | null,
    oldValue: Cloth[] | ClothesHash | null,
  ) {
    // console.log('clothlist watch changed');
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

  public deleteCloth(clickedCloth: Cloth) {
    console.log('deleteCloth', clickedCloth);
    // list에서 제거하고,

    // clothList에서 제거
    (this.clothList as ClothesHash)[
      clickedCloth.data.majorClass as MajorClass
    ] = null;
    this.$forceUpdate();
    console.log(this.clothList);

    // 이벤트 상위 컴포넌트에 전달
    this.$emit('deleteCloth', clickedCloth);
  }

  public setSeeMoreListener(listener: () => void) {
    this.seeMoreListener = listener;
  }
  public seeMore() {
    console.log('seeMore');
    if (!_.isNil(this.seeMoreListener)) {
      this.seeMoreListener();
    }
  }

  private showGender(cloth: Cloth): string {
    switch (cloth.data.gender) {
      case 'unisex':
        return '공';
      case 'man':
        return '남';
      case 'woman':
        return '여';
      default:
        return '';
    }
  }
}
