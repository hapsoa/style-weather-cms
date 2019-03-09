export interface ClothData {
  id: string;
  groupName: string;
  linkUrl: string;
  genderSelected: string[];
  majorClass: MajorClass | null;
  minorSelect: string | null;
  weatherSelect: string | null;
  temperatureSelect: string | null;
  thicknessSelected: string[];
  colorSelect: string | null;
}

export enum MajorClass {
  Top = '상의',
  Bottoms = '하의',
  Outer = '아우터',
  Accessory = '액세서리',
  Shoes = '신발',
  bag = '가방',
  glasses = '안경',
  hat = '모자',
  dress = '원피스'
}

export default class Cloth implements ClothData {
  public id: string = '';

  public groupName: string = '';
  public linkUrl: string = '';
  public genderSelected: string[] = [];
  public majorClass: MajorClass | null = null;
  public minorSelect: string | null = null;
  public weatherSelect: string | null = null;
  public temperatureSelect: string | null = null;
  public thicknessSelected: string[] = [];
  public colorSelect: string | null = null;

  public imageName: string = '';
  public imageUrl: string | ArrayBuffer | null = null;
  public imageFile: File | null = null;

  // 모든 데이터가 다 있는지 체크하는 기능
  public canSave: boolean = false;

  public constructor(majorClass: MajorClass) {
    this.majorClass = majorClass;
  }

  // db c r u d
  // storage(해당 부위 이미지) c r u d

  // load(ClothId) - 상세보기에서 불러오기
}
