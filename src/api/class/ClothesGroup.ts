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

  public clothes: Cloth[] = [];

  // Cloth 9개가 모든 데이터가 온전히 다있는지 체크하는 기능
  // db c r u d
  // storage(총괄 이미지 1장) c r u d
}
