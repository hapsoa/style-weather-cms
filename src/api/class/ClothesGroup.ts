import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { Cloth } from '@/api/class';
import { MajorClass } from '@/api/class/Cloth';
import { fbClothesGroupApi } from '@/api/firebase';

export interface ClothesGroupData {
  id: string;
  name: string;
  clothIds: string[];
  imageUrl: string; // firebase storage url
}

export interface ClothesHash {
  [MajorClass.Outer]: Cloth | null;
  [MajorClass.Top]: Cloth | null;
  [MajorClass.OnePiece]: Cloth | null;
  [MajorClass.Bottoms]: Cloth | null;
  [MajorClass.Bag]: Cloth | null;
  [MajorClass.Shoes]: Cloth | null;
  [MajorClass.Hat]: Cloth | null;
  [MajorClass.Glasses]: Cloth | null;
  [MajorClass.Accessory]: Cloth | null;
  [MajorClass.Etc]: Cloth | null;
  // [index: string]: Cloth;
}

export default class ClothesGroup implements ClothesGroupData {
  public static create(): ClothesGroup {
    const newClothesGroup = new ClothesGroup();

    return newClothesGroup;
  }

  public static load() {
    //
  }

  public id: string = '';
  public name: string = '';
  public clothIds: string[] = [];
  public imageUrl: string = '';

  public clothes: ClothesHash = {
    outer: null,
    top: null,
    onePiece: null,
    bottoms: null,
    bag: null,
    shoes: null,
    hat: null,
    glasses: null,
    accessory: null,
    etc: null,
  };

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
      if (!_.isNil(cloth) && !cloth.canSave) {
        canSave = false;
        return false; // break;
      }
      canSave = true;
    });
    return canSave;
  }

  // save()
  public async save(outlineImage: Blob) {
    // 전체 스크린샷 이미지 저장
    await fbClothesGroupApi.storage.create(this.id, outlineImage);
    // 전체 스크린샷 가져오기
    this.imageUrl = await fbClothesGroupApi.storage.read(this.id);

    // db 저장
    await fbClothesGroupApi.db.create({
      id: this.id,
      name: this.name,
      clothIds: this.clothIds,
      imageUrl: this.imageUrl,
    });

    // clothes 중 null이 아닌 cloth들을 모두 저장.
    const clothPromises: Array<Promise<void>> = [];
    _.forEach(this.clothes, cloth => {
      if (!_.isNil(cloth)) {
        clothPromises.push(cloth.save());
      }
    });
    await Promise.all(clothPromises);
  }
}
