import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { Cloth } from '@/api/class';
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

@Component({})
export default class ClothCreation extends Vue {
  public $refs!: {
    imageInput: any;
    form: any;
  };

  private cloth: Cloth = Cloth.create();

  private formValid: boolean = false;

  private clothNameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 50) || 'Name must be less than 50 characters',
  ];
  private priceRules = [
    (v: string) => {
      // console.log('num', !isNaN(_.toNumber(v)));
      return !isNaN(_.toNumber(v)) || 'Price(only number) is required';
    },
  ];
  private linkUrlRules = [(v: string) => true];
  private genderItems: string[] = ['man', 'woman'];
  private genderRules = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Gender is required';
    },
  ];
  private majorSelect: MajorClass | null = null;
  private majorClassItems: string[] = _.map(MajorClass, v => v);
  private topMinorClassItems: string[] = _.map(TopMinorClass, v => v);
  private onePieceMinorClassItems: string[] = _.map(OnePieceMinorClass, v => v);
  private bottomsMinorClassItems: string[] = _.map(BottomsMinorClass, v => v);
  private outerMinorClassItems: string[] = _.map(OuterMinorClass, v => v);
  private accessoryMinorClassItems: string[] = _.map(
    AccessoryMinorClass,
    v => v,
  );
  private shoesMinorClassItems: string[] = _.map(ShoesMinorClass, v => v);
  private bagMinorClassItems: string[] = _.map(BagMinorClass, v => v);
  private glassesMinorClassItems: string[] = _.map(GlassesMinorClass, v => v);
  private hatMinorClassItems: string[] = _.map(HatMinorClass, v => v);
  public get minorSelect(): string[] {
    console.log('majorSelect Changed');
    this.cloth.data.majorClass = this.majorSelect;
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
  // private temperatureItems: string[] = [
  //   '4도 이하',
  //   '5 ~ 9도',
  //   '12 ~ 16도',
  //   '17 ~ 19도',
  //   '20 ~ 22도',
  //   '23 ~ 27도',
  //   '28도 이상',
  // ];
  private temperatureItems: string[] = [
    '4도 이하', // [0, 1, 2, 3, 4]
    '5 ~ 9도', // [5, 6, 7, 8, 9]
    '12 ~ 16도', // [12, 13, 14, 15, 16]
    '17 ~ 19도', // [17, 18, 19]
    '20 ~ 22도', // 5
    '23 ~ 27도', // 6
    '28도 이상', // 7
  ];
  private realValue = [0, 1, 2, 3]; //

  private thicknessItems: string[] = ['thick', 'moderate', 'thin'];
  private thicknessRule = [(v: string) => !!v || 'Thickness is required'];
  private colorItems: string[] = ['achromatic', 'chromatic'];
  private imageRules = [(v: string) => !!v || 'Image is required'];

  private canSave: boolean = false;
  // private chip2: boolean = true;
  private addingHashtag: string = '';

  public pickFile() {
    this.$refs.imageInput.click();
  }
  public onFilePicked(e: any) {
    const files: File[] = e.target.files;

    if (files[0] !== undefined) {
      this.cloth.imageName = files[0].name;
      if (this.cloth.imageName.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener('load', () => {
        this.cloth.data.imageUrl = fr.result;
        this.cloth.imageFile = files[0];
      });
    } else {
      this.cloth.imageName = '';
      this.cloth.imageFile = null;
      this.cloth.data.imageUrl = '';
    }
  }

  // 이미지 픽셀 resize해서 저장
  // public onFilePicked(e: any) {
  //   // @ts-ignore
  //   const files = e.target.files;
  //   if (files[0] !== undefined) {
  //     this.cloth.imageName = files[0].name;
  //     if (this.cloth.imageName.lastIndexOf('.') <= 0) {
  //       return;
  //     }

  //     const fileName = files[0].name;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onload = event => {
  //       const img = new Image();
  //       const width = 300;
  //       const scaleFactor = width / img.width;
  //       const height = img.height * scaleFactor;

  //       img.src = reader.result as string;
  //       img.onload = () => {
  //         const elem = document.createElement('canvas');
  //         elem.width = width;
  //         elem.height = height;
  //         const ctx: CanvasRenderingContext2D = elem.getContext(
  //           '2d',
  //         ) as CanvasRenderingContext2D;
  //         // img.width and img.height will contain the original dimensions
  //         ctx.drawImage(img, 0, 0, width, height);
  //         ctx.canvas.toBlob(
  //           blob => {
  //             const file: File = new File([blob as Blob], fileName, {
  //               type: 'image/jpeg',
  //               lastModified: Date.now(),
  //             });
  //             this.cloth.imageFile = file;
  //           },
  //           'image/jpeg',
  //           0.5,
  //         );
  //       };
  //       reader.onerror = error => console.log(error);

  //       this.cloth.data.imageUrl = reader.result;
  //     };
  //   } else {
  //     this.cloth.imageName = '';
  //     this.cloth.imageFile = null;
  //     this.cloth.data.imageUrl = '';
  //   }
  // }

  public addHashtag() {
    // 배열에 저장한다.
    if (this.addingHashtag !== '') {
      this.cloth.data.hashtags.push(this.addingHashtag);
      this.addingHashtag = '';
    }
    console.log('this.cloth.hashtags', this.cloth.data.hashtags);
  }
  public deleteHashtag(index: number) {
    this.cloth.data.hashtags.splice(index, 1);
  }

  public validate() {
    // form tag validate성공 시 this.formValid를 true. return값도 true
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.cloth.data.name);

      this.cloth.canSave = true;
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public async saveCloth() {
    console.log('저장');
    this.$store.state.isFullProgress = true;
    try {
      if (!_.isNil(this.$route.params.id)) {
        await this.cloth.saveToUpdate();
      } else {
        await this.cloth.saveToCreate();
      }
      this.$router.push({ name: 'main' });
      this.$store.state.isFullProgress = false;
    } catch (error) {
      this.$store.state.isFullProgress = false;
      console.error('저장 실패', error);
      alert('저장 실패');
    }
  }

  private async created() {
    // props에 cloth가 삽입되었다면 edition이고
    // cloth가 삽입되지 않았다면 creation이다.
    if (!_.isNil(this.$route.params.id)) {
      this.cloth = await Cloth.load(this.$route.params.id);
      this.majorSelect = this.cloth.data.majorClass;
    } else {
      this.cloth = Cloth.create();
    }
  }
}
