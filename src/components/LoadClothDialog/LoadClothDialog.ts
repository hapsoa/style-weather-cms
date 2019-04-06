import { Component, Vue, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import ClothList from '@/components/ClothList/ClothList.vue';
import ClothListTs from '@/components/ClothList/ClothList.ts';
import { Cloth, ClothesGroup } from '@/api/class';
import {
  MajorClass,
  TopMinorClass,
  OnePieceMinorClass,
  BottomsMinorClass,
  OuterMinorClass,
  AccessoryMinorClass,
  ShoesMinorClass,
  BagMinorClass,
  GlassesMinorClass,
  HatMinorClass,
} from '@/api/class/Cloth';

@Component({
  components: {
    ClothList,
  },
})
export default class LoadClothDialog extends Vue {
  public $refs!: {
    clothList: ClothListTs;
  };

  @Prop({ type: Object as () => ClothesGroup, required: true })
  public clothesGroup!: ClothesGroup;
  private isOpen: boolean = false;
  private clothList: Cloth[] = [];
  private selectedCloth: Cloth | null = null;
  private currentCloth: Cloth | null = null;

  private majorSelect: string | null = 'All';
  private majorClassItems: string[] = _.concat(
    ['All'],
    _.map(MajorClass, v => v),
  );
  private topMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(TopMinorClass, v => v),
  );
  private onePieceMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(OnePieceMinorClass, v => v),
  );
  private bottomsMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(BottomsMinorClass, v => v),
  );
  private outerMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(OuterMinorClass, v => v),
  );
  private accessoryMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(AccessoryMinorClass, v => v),
  );
  private shoesMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(ShoesMinorClass, v => v),
  );
  private bagMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(BagMinorClass, v => v),
  );
  private glassesMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(GlassesMinorClass, v => v),
  );
  private hatMinorClassItems: string[] = _.concat(
    ['All'],
    _.map(HatMinorClass, v => v),
  );
  private minorSelect: string | null = null;
  private searchInput: string = '';
  public async changeMajorSelect(majorSelect: string) {
    this.majorSelect = majorSelect;

    const newArray = await Cloth.getByQuery({
      searchInput: this.searchInput,
      majorClass: this.majorSelect,
      minorClass: this.minorSelect,
    });
    console.log('newArray1', newArray);
  }
  public get minorClassItems(): string[] {
    switch (this.majorSelect) {
      case MajorClass.Top: {
        return this.topMinorClassItems;
      }
      case MajorClass.OnePiece: {
        return this.onePieceMinorClassItems;
      }
      case MajorClass.Bottoms: {
        return this.bottomsMinorClassItems;
      }
      case MajorClass.Outer: {
        return this.outerMinorClassItems;
      }
      case MajorClass.Accessory: {
        return this.accessoryMinorClassItems;
      }
      case MajorClass.Shoes: {
        return this.shoesMinorClassItems;
      }
      case MajorClass.Bag: {
        return this.bagMinorClassItems;
      }
      case MajorClass.Hat: {
        return this.hatMinorClassItems;
      }
      case MajorClass.Glasses: {
        return this.glassesMinorClassItems;
      }
      default: {
        return [];
      }
    }
  }

  public searchClothes() {
    // 검색버튼 누르기 기능
  }
  public confirm() {
    this.isOpen = false;
    this.$emit('confirm', this.selectedCloth);
  }
  public cancel() {
    this.isOpen = false;
  }

  private async created() {
    Cloth.initNextIndex();
    this.clothList = await Cloth.loadMultipleByRecent(10);
  }
  private mounted() {
    this.$refs.clothList.setClickClothListener((cloth: Cloth) => {
      this.selectedCloth = cloth;
      this.currentCloth = this.clothesGroup.clothes[
        cloth.majorClass as MajorClass
      ];
    });
  }
}
