import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { Cloth } from '@/api/class';
import { MajorClass } from '@/api/class/Cloth';
import { fbClothesGroupApi } from '@/api/firebase';

export interface ClothesGroupData {
  id: string;
  name: string;
  clothIds: string[];
  image: string;
}

export interface ClothesHash {
  [MajorClass.Outer]: Cloth;
  [MajorClass.Top]: Cloth;
  [MajorClass.OnePiece]: Cloth;
  [MajorClass.Bottoms]: Cloth;
  [MajorClass.Bag]: Cloth;
  [MajorClass.Shoes]: Cloth;
  [MajorClass.Hat]: Cloth;
  [MajorClass.Glasses]: Cloth;
  [MajorClass.Accessory]: Cloth;
  [MajorClass.Etc]: Cloth;
  // [index: string]: Cloth;
}

export default class ClothesGroup implements ClothesGroupData {
  public static create(): ClothesGroup {
    const newClothesGroup = new ClothesGroup();

    newClothesGroup.clothes = {
      outer: Cloth.create(MajorClass.Outer),
      top: Cloth.create(MajorClass.Top),
      onePiece: Cloth.create(MajorClass.OnePiece),
      bottoms: Cloth.create(MajorClass.Bottoms),
      bag: Cloth.create(MajorClass.Bag),
      shoes: Cloth.create(MajorClass.Shoes),
      hat: Cloth.create(MajorClass.Hat),
      glasses: Cloth.create(MajorClass.Glasses),
      accessory: Cloth.create(MajorClass.Accessory),
      etc: Cloth.create(MajorClass.Etc)
    };

    return newClothesGroup;
  }

  public static load() {
    //
  }

  public id: string = '';
  public name: string = '';
  public clothIds: string[] = [];
  public image: string = '';

  public clothes: ClothesHash | null = null;

  public constructor() {
    this.id = uuidv4();
  }

  // db c r u d
  // storage(총괄 이미지 1장) c r u d

  // load(clothesGroupId: string) - 메인화면에서 불러오기
  // loadClothes() - Cloth[]에 9개 instance 생성

  // Cloth 9개가 모든 데이터가 온전히 다있는지 체크하는 기능
  public checkCanSave(): boolean {
    let canSave: boolean = false;
    _.forEach(this.clothes, cloth => {
      if (!cloth.canSave) {
        canSave = false;
        return false; // break;
      }
      canSave = true;
    });
    return canSave;
  }

  // save()
  public async save() {
    // fbClothesGroupApi.db.create();
    // 전체 스크린샷 이미지 저장
    // fbClothesGroupApi.storage.create();
  }
}
