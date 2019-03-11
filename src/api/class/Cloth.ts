import uuidv4 from 'uuid/v4';

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
  Etc = 'etc'
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
}
