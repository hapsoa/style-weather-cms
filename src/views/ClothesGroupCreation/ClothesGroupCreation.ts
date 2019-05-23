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
  get minorClassItems(): string[] {
    console.log(
      'minorClassItems?',
      (this.currentCloth as Cloth).data.majorClass,
    );
    switch ((this.currentCloth as Cloth).data.majorClass) {
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
      (v && v.length <= 50) || 'Name must be less than 50 characters',
  ];
  private linkUrlRules = [
    (v: string) => !!v || 'Link is required',
    // (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ];

  private imageName: string = '';
  // private imageUrl: string | ArrayBuffer | null = null;
  // private imageFile: File | null = null;
  private imageRules = [(v: string) => !!v || 'Image is required'];

  private genderItems: string[] = ['man', 'woman', 'unisex'];
  private genderRules = [(v: string) => !!v || 'Gender is required'];

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
  private majorClassItems2: string[] = Object.keys(MajorClass);

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
  private weatherItems: string[] = [
    'clear',
    'cloudy',
    'rain',
    'windy',
    'snow',
    'fineDust',
    'heatWave',
  ];
  private weatherRules = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Weather is required';
    },
  ];
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
  private temperatureRules = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Temperature is required';
    },
  ];

  private thicknessItems: string[] = ['thick', 'moderate', 'thin'];
  private thicknessRule = [(v: string) => !!v || 'Thickness is required'];

  private addingHashtag: string = '';

  private canSave: boolean = false;

  private clothesGroup!: ClothesGroup;
  private currentCloth: Cloth | null = null;
  public addHashtag() {
    // 배열에 저장한다.
    if (this.addingHashtag !== '') {
      this.clothesGroup.hashtags.push(this.addingHashtag);
      this.addingHashtag = '';
    }
    console.log('this.cloth.hashtags', this.clothesGroup.hashtags);
  }

  public validate() {
    // form tag validate성공 시 this.formValid를 true. return값도 true
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.clothesGroup.name);
      // if (!_.isNil(this.currentCloth)) {
      //   this.currentCloth.canSave = true;
      // }
      this.canSave = true;
    } else {
      this.canSave = false;
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public changeMajorSelect(majorSelect: MajorClass) {
    // 해당 clothesGroup['top']을 선택하도록 한다.
    this.selectedMajorClass = majorSelect;
    this.currentCloth = this.clothesGroup.clothes[majorSelect];
  }
  public changeMinorSelect(minorSelect: string) {
    (this.currentCloth as Cloth).data.minorClass = minorSelect;
  }

  public saveClothesGroup() {
    this.$store.state.isFullProgress = true;
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

      const canvasDataUrl: string = this.$refs.clothesCanvas.canvas.toDataURL({
        multiplier: 4,
      });
      const canvasBlob: Blob = this.dataURItoBlob(canvasDataUrl);
      setTimeout(async () => {
        await this.clothesGroup.save(canvasBlob as Blob);
        this.$router.push({ name: 'main' });
        this.$store.state.isFullProgress = false;
      }, 100);
      // setTimeout(() => {
      //   this.$refs.clothesCanvas.getCanvasHTMLElement().toBlob(async blob => {
      //     await this.clothesGroup.save(blob as Blob);
      //   });
      // }, 100);
    } catch (error) {
      this.$store.state.isFullProgress = false;
      console.error(error);
      alert('저장 실패');
    }
  }
  public dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  public confirmLoadCloth(cloth: Cloth) {
    // this.clothesGroup.clothes[cloth.majorClass as MajorClass] = cloth;
    this.$set(
      this.clothesGroup.clothes,
      `${cloth.data.majorClass as MajorClass}`,
      cloth,
    );
    this.clothesGroup.clothIds.push(cloth.data.id);
    this.clothesGroup.hashtags = _.concat(
      this.clothesGroup.hashtags,
      cloth.data.hashtags,
    );
    this.$forceUpdate();
    this.$refs.clothList.forceUpdate();

    console.log('this.clothesGroup.clothes', this.clothesGroup.clothes);
    this.$refs.clothesCanvas.addImage(
      cloth.data.imageUrl as string,
      cloth.data.majorClass as MajorClass,
    );
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
