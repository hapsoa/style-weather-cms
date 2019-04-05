import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
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
import { ClothesHash } from '@/api/class/ClothesGroup';
import ClothesCanvas from '@/components/ClothesCanvas/ClothesCanvas.vue';
import ClothesCanvasTs from '@/components/ClothesCanvas/ClothesCanvas.ts';
import ClothList from '@/components/ClothList/ClothList.vue';
import ClothListTs from '@/components/ClothList/ClothList.ts';
import LoadClothDialog from '@/components/LoadClothDialog/LoadClothDialog.vue';
import LoadClothDialogTs from '@/components/LoadClothDialog/LoadClothDialog.ts';

@Component({
  components: {
    ClothesCanvas,
    ClothList,
    LoadClothDialog,
  },
})
export default class ClothesGroupCreation extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    form: any;
    imageInput: any;
    clothesCanvas: ClothesCanvasTs;
    clothList: ClothListTs;
    loadClothDialog: LoadClothDialogTs;
  };

  private formValid: boolean = false;

  private groupNameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 20) || 'Name must be less than 20 characters',
  ];
  private linkUrlRules = [
    (v: string) => !!v || 'Link is required',
    // (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ];

  private imageName: string = '';
  // private imageUrl: string | ArrayBuffer | null = null;
  // private imageFile: File | null = null;
  private imageRules = [(v: string) => !!v || 'Image is required'];

  private genderSelected: string[] = [];
  private genderRule = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Gender is required';
    },
  ];

  private selectedMajorClass: MajorClass | null = null;
  private majorClassItems: string[] = [
    MajorClass.Top, // top
    MajorClass.Outer,
    MajorClass.OnePiece,
    MajorClass.Bottoms, // bottoms
    MajorClass.Bag,
    MajorClass.Shoes,
    MajorClass.Hat,
    MajorClass.Glasses,
    MajorClass.Accessory,
    MajorClass.Etc,
  ];

  private topMinorClassItems!: string[];
  private dressMinorClassItems!: string[];
  private bottomsMinorClassItems!: string[];
  private outerMinorClassItems!: string[];
  private accessoryMinorClassItems!: string[];
  private shoesMinorClassItems!: string[];
  private bagMinorClassItems!: string[];
  private glassesMinorClassItems!: string[];
  private hatMinorClassItems!: string[];
  private weatherSelect: string | null = null;
  private weatherItems: string[] = ['눈', '비', '미세먼지', '폭염'];
  private temperatureSelect: string | null = null;
  private temperatureItems: string[] = [
    '4도 이하',
    '5 ~ 9도',
    '12 ~ 16도',
    '17 ~ 19도',
    '20 ~ 22도',
    '23 ~ 27도',
    '28도 이상',
  ];

  private thicknessSelected: string[] = [];
  private thicknessRule = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Gender is required';
    },
  ];
  private colorSelect: string | null = null;
  private colorItems: string[] = ['무채', '유채'];

  private canSave: boolean = false;

  private clothesGroup!: ClothesGroup;
  private currentCloth: Cloth | null = null;

  public validate() {
    // form tag validate성공 시 this.formValid를 true. return값도 true
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.clothesGroup.name);
      if (!_.isNil(this.currentCloth)) {
        this.currentCloth.canSave = true;
      }
      this.canSave = this.clothesGroup.checkCanSave();
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public pickFile() {
    this.$refs.imageInput.click();
  }
  public onFilePicked(e: any) {
    const files = e.target.files;
    if (!_.isNil(this.currentCloth)) {
      if (files[0] !== undefined) {
        this.currentCloth.imageName = files[0].name;
        if (this.currentCloth.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener('load', () => {
          if (!_.isNil(this.currentCloth)) {
            (this.currentCloth as Cloth).imageUrl = fr.result;
            (this.currentCloth as Cloth).imageFile = files[0]; // this is an image file that can be sent to server...
            // console.log('imageFile', this.imageFile);
            this.$refs.clothesCanvas.addImage(
              fr.result as string,
              this.currentCloth.majorClass as MajorClass,
            );
          }
        });
      } else {
        this.currentCloth.imageName = '';
        this.currentCloth.imageFile = null;
        this.currentCloth.imageUrl = '';
      }
    } else {
      throw new Error('currentCloth가 null이뜨네');
    }
  }

  public changeMajorSelect(majorSelect: MajorClass) {
    // 해당 clothesGroup['top']을 선택하도록 한다.
    this.selectedMajorClass = majorSelect;
    this.currentCloth = this.clothesGroup.clothes[majorSelect];
  }
  public changeMinorSelect(minorSelect: string) {
    (this.currentCloth as Cloth).minorClass = minorSelect;
  }

  public saveClothesGroup() {
    try {
      // const canvas: HTMLCanvasElement = await html2canvas(
      //   document.getElementById('clothes-zone-container') as HTMLElement,
      // );

      // canvas.toBlob(async blob => {
      //   // console.log('blob', blob);

      //   await this.clothesGroup.save(blob as Blob);
      // });

      this.$refs.clothesCanvas.discardActiveObject();
      this.$refs.clothesCanvas.canSave = true;

      setTimeout(() => {
        this.$refs.clothesCanvas.getCanvasHTMLElement().toBlob(async blob => {
          await this.clothesGroup.save(blob as Blob);
        });
      }, 100);

      //  this.$router.push({name: 'main'});
    } catch (error) {
      console.error(error);
      alert('저장 실패');
    }
  }

  public confirmLoadCloth(cloth: Cloth) {
    // this.clothesGroup.clothes[cloth.majorClass as MajorClass] = cloth;
    this.$set(
      this.clothesGroup.clothes,
      `${cloth.majorClass as MajorClass}`,
      cloth,
    );
    this.$refs.clothList.forceUpdate();

    console.log('this.clothesGroup.clothes', this.clothesGroup.clothes);
    this.$refs.clothesCanvas.addImage(
      cloth.imageUrl as string,
      cloth.majorClass as MajorClass,
    );
  }

  get minorClassItems(): string[] {
    console.log('minorClassItems?', (this.currentCloth as Cloth).majorClass);
    switch ((this.currentCloth as Cloth).majorClass) {
      case MajorClass.Top: {
        return this.topMinorClassItems;
      }
      case MajorClass.OnePiece: {
        return this.dressMinorClassItems;
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

  private created() {
    this.$store.state.isMainPage = false;

    this.topMinorClassItems = Object.keys(TopMinorClass);
    this.dressMinorClassItems = Object.keys(OnePieceMinorClass);
    this.bottomsMinorClassItems = Object.keys(BottomsMinorClass);
    this.outerMinorClassItems = Object.keys(OuterMinorClass);
    this.accessoryMinorClassItems = Object.keys(AccessoryMinorClass);
    this.shoesMinorClassItems = Object.keys(ShoesMinorClass);
    this.bagMinorClassItems = Object.keys(BagMinorClass);
    this.glassesMinorClassItems = Object.keys(GlassesMinorClass);
    this.hatMinorClassItems = Object.keys(HatMinorClass);

    this.clothesGroup = ClothesGroup.create();
    console.log('this.clothesGroup.id', this.clothesGroup.id);

    // clothesGroup instance 가져오기
    // if (
    //   this.$store.state.selectedClothesGroup.id ===
    //   this.$route.params.clothesGroupId
    // ) {
    //   this.clothesGroup = this.$store.state.selectedClothesGroup;
    // } else {
    //   this.clothesGroup = ClothesGroup.load(this.$route.params.clothesGroupId);
    // }
    // this.clothesGroup.loadClothes();

    // if (!_.isNil(this.$store.state.selectedClothesGroup)) {
    //   // load clothesGroup
    // } else {
    //   // new clothesGroup
    // }
  }

  // private updated() {
  //   console.log('!!');
  //   if (this.$refs.clothesCanvas.canSave) {
  //     this.$refs.clothesCanvas.getCanvasHTMLElement().toBlob(async blob => {
  //       await this.clothesGroup.save(blob as Blob);
  //     });
  //     this.$refs.clothesCanvas.canSave = false;
  //   }
  // }
}
