import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import { Cloth, ClothesGroup } from '@/api/class';
import {
  MajorClass,
  TopMinorClass,
  OnePieceMinorClass,
} from '@/api/class/Cloth';
import { ClothesHash } from '@/api/class/ClothesGroup';

@Component({})
export default class GroupCreation extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    form: any;
    image: any;
  };

  private formValid: boolean = true;

  private groupName: string = '';
  private groupNameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 20) || 'Name must be less than 20 characters',
  ];

  private linkUrl: string = '';
  private linkUrlRules = [
    (v: string) => !!v || 'Link is required',
    // (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ];
  // private select = null;
  // private items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  // private checkbox: boolean = false;

  private imageName: string = '';
  private imageUrl: string | ArrayBuffer | null = null;
  private imageFile: File | null = null;
  private imageRules = [(v: string) => !!v || 'Image is required'];

  private genderSelected: string[] = [];
  private genderRule = [
    (v: string[]) => {
      return !_.isEmpty(v) || 'Gender is required';
    },
  ];

  // private majorSelect: string | null = null;
  // private majorClassItems: string[] = [
  //   MajorClass.Top, // top
  //   MajorClass.Outer,
  //   MajorClass.OnePiece,
  //   MajorClass.Bottoms, // bottoms
  //   MajorClass.Bag,
  //   MajorClass.Shoes,
  //   MajorClass.Hat,
  //   MajorClass.Glasses,
  //   MajorClass.Accessory,
  //   MajorClass.Etc,
  // ];

  private topMinorClassItems: string[] = [];
  private dressMinorClassItems: string[] = [];
  private bottomsMinorClassItems: string[] = [
    '데님',
    '반바지',
    '면바지',
    '스커트',
    '레깅스',
    '슬랙스',
    '트레이닝바지',
    '기타',
  ];
  private outerMinorClassItems: string[] = [
    '코트',
    '자켓',
    '패딩',
    '점퍼',
    '베스트',
    '후리스',
    '후드집업',
    '가디건',
    '기타',
  ];
  private accessoryMinorClassItems: string[] = [
    '마스크',
    '머플러',
    '장갑',
    '기타',
  ];
  private shoesMinorClassItems: string[] = [
    '구두',
    '부츠',
    '플랫',
    '힐',
    '샌들/슬리퍼',
    '운동화',
    '스니커즈',
    '기타',
  ];
  private bagMinorClassItems: string[] = ['백팩', '핸드백', '기타'];
  private glassesMinorClassItems: string[] = ['썬글라스', '안경', '기타'];
  private hatMinorClassItems: string[] = [
    '캡모자',
    '비니',
    '테도라',
    '베레모',
    '버킷',
    '썬캡',
    '밀짚모자',
    '기타',
  ];

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

  private clothesGroup: ClothesGroup | null = null;
  private currentCloth: Cloth | null = null;
  public selectCloth(majorClass: MajorClass) {
    this.currentCloth = ((this.clothesGroup as ClothesGroup)
      .clothes as ClothesHash)[majorClass];
    console.log('selectCloth', majorClass, this.currentCloth);
  }

  public validate() {
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.groupName, 'linkUrl', this.linkUrl);
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public pickFile() {
    this.$refs.image.click();
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
          (this.currentCloth as Cloth).imageUrl = fr.result;
          (this.currentCloth as Cloth).imageFile = files[0]; // this is an image file that can be sent to server...
          // console.log('imageFile', this.imageFile);
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
    (this.currentCloth as Cloth).majorClass = majorSelect;
  }
  public changeMinorSelect(minorSelect: string) {
    (this.currentCloth as Cloth).minorClass = minorSelect;
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

    this.clothesGroup = ClothesGroup.create();

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
}
