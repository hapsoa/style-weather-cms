import { Component, Vue, Prop } from 'vue-property-decorator';
import ClothList from '@/components/ClothList/ClothList.vue';
import ClothListTs from '@/components/ClothList/ClothList.ts';
import { Cloth, ClothesGroup } from '@/api/class';
import { MajorClass } from '@/api/class/Cloth';

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

  public confirm() {
    this.isOpen = false;
    this.$emit('confirm', this.selectedCloth);
  }
  public cancel() {
    this.isOpen = false;
  }

  private async created() {
    console.log('loadClothDialog created()');
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
