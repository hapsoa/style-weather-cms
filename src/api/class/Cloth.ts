import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { fbClothApi } from '@/api/firebase';

export enum MajorClass {
  Top = 'top',
  Bottoms = 'bottoms',
  Outer = 'outer',
  Accessory = 'accessory',
  Shoes = 'shoes',
  Bag = 'bag',
  Glasses = 'glasses',
  Hat = 'hat',
  OnePiece = 'onePiece',
  Etc = 'etc',
}

export enum TopMinorClass {
  ShortSleeve = 'shortSleeve',
  ManToMan = 'manToMan',
  LongSleeve = 'longSleeve',
  Sleeveless = 'sleeveless',
  Hood = 'hood',
  ShirtBlouse = 'shirt/blouse',
  KnitSweaterCardigan = 'knit/sweater/cardigan',
  Etc = 'etc',
}

export enum OnePieceMinorClass {
  OnePiece = 'onePiece',
  Etc = 'etc',
}

export enum BottomsMinorClass {
  Denim = 'denim',
  ShortPants = 'shortPants',
  CottonPants = 'cottonPants',
  Skirt = 'skirt',
  Leggings = 'leggings',
  Slacks = 'slacks',
  TrainingPants = 'trainingPants',
  Etc = 'etc',
}

export enum OuterMinorClass {
  Coat = 'coat',
  Jacket = 'jacket',
  Padding = 'padding',
  Jumper = 'jumper',
  Vest = 'vest',
  Fleece = 'fleece',
  HoodZipUp = 'hoodZipUp',
  Cardigan = 'cardigan',
  Etc = 'etc',
}

export enum AccessoryMinorClass {
  Mask = 'mask',
  Muffler = 'muffler',
  Gloves = 'gloves',
  Etc = 'etc',
}

export enum ShoesMinorClass {
  Gudu = 'gudu',
  Boots = 'boots',
  Flat = 'flat',
  Heel = 'heel',
  SandalOrSlipper = 'sandalOrSlipper',
  RunningShoes = 'runningShoes',
  Sneakers = 'sneakers',
  Etc = 'etc',
}

export enum BagMinorClass {
  Backpack = 'backpack',
  Handbag = 'handbag',
  Etc = 'etc',
}

export enum GlassesMinorClass {
  Sunglass = 'sunglass',
  Glasses = 'glasses',
  Etc = 'etc',
}

export enum HatMinorClass {
  Cap = 'cap',
  Beanie = 'beanie',
  Fedora = 'fedora',
  Beret = 'beret',
  BucketHat = 'bucketHat',
  SunCap = 'sunCap',
  StrawHat = 'strawHat',
  Etc = 'etc',
}

export interface ClothData {
  id: string;
  linkUrl: string;
  gender: string[];
  majorClass: MajorClass | null;
  minorClass: string | null;
  weather: string | null;
  temperature: string | null;
  thickness: string[];
  color: string | null;
  imageUrl: string | ArrayBuffer | null;
}

export default class Cloth implements ClothData {
  public static create(majorClass: MajorClass): Cloth {
    const newCloth = new Cloth(majorClass);
    newCloth.id = uuidv4();
    return newCloth;
  }

  public static load() {
    //
  }

  public id: string = '';
  public majorClass: MajorClass | null = null;

  public linkUrl: string = '';
  public gender: string[] = [];
  public minorClass: string | null = null;
  public weather: string | null = null;
  public temperature: string | null = null;
  public thickness: string[] = [];
  public color: string | null = null;

  public imageName: string = '';
  public imageUrl: string | ArrayBuffer | null = null;
  public imageFile: File | null = null;

  // 모든 데이터가 다 있는지 체크하는 기능
  public canSave: boolean = false;

  private constructor(majorClass: MajorClass) {
    this.majorClass = majorClass;
  }

  // db c r u d
  // storage(해당 부위 이미지) c r u d

  // load(ClothId) - 상세보기에서 불러오기

  public async save(): Promise<void> {
    if (!_.isNil(this.imageFile)) {
      // storage에 저장하고, url을 가져온다.
      await fbClothApi.storage.create(this.id, this.imageFile);
      this.imageUrl = await fbClothApi.storage.read(this.id);

      // db에 저장한다.
      await fbClothApi.db.create({
        id: this.id,
        linkUrl: this.linkUrl,
        gender: this.gender,
        majorClass: this.majorClass,
        minorClass: this.minorClass,
        weather: this.weather,
        temperature: this.temperature,
        thickness: this.thickness,
        color: this.color,
        imageUrl: this.imageUrl,
      });
    } else {
      throw new Error('이미지 파일이 없는데 cloth.save() 시도하고 있다.');
    }
  }
}
