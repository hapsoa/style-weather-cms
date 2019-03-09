import { Cloth } from '@/api/class';

export interface ClothesGroupData {
  id: string;
  clothIds: string[];
  image: string;
}

export default class ClothesGroup implements ClothesGroupData {
  public id: string = '';
  public clothIds: string[] = [];
  public image: string = '';

  public clothes: {
    outer: Cloth;
    top: Cloth;
    dress: Cloth;
    bottoms: Cloth;
    bag: Cloth;
    shoes: Cloth;
    hat: Cloth;
    glasses: Cloth;
    accessory: Cloth;
    etc: Cloth;
  } | null = null;

  // Cloth 9개가 모든 데이터가 온전히 다있는지 체크하는 기능
  public canSave: boolean = false;

  // db c r u d
  // storage(총괄 이미지 1장) c r u d

  // load(clothesGroupId: string) - 메인화면에서 불러오기
  // loadClothes() - Cloth[]에 9개 instance 생성
}
