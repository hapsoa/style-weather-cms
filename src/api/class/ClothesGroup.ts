import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { Cloth } from '@/api/class';
import { MajorClass } from '@/api/class/Cloth';
import { fbClothesGroupApi } from '@/api/firebase';

export interface ClothesGroupData {
  id: string;
  name: string;
  clothIds: string[];
  // clothDatas: {
  //   [MajorClass.Top]: {
  //     id: string, positionX: number, positionY: number
  //   }
  // };
  imageUrl: string; // firebase storage url
  createdAt: number;
  gender: string;
  weather: string[];
  temperature: number[] | string[];
  thickness: string;
  hashtags: string[];
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
    newClothesGroup.id = uuidv4();

    return newClothesGroup;
  }

  public static async load(id: string): Promise<ClothesGroup> {
    // id에 해당하는 clothesGroup의 정보를 읽어온다.
    // 그리고 ClothesGroup instance로 만들어 return 한다.
    const clothesGroupData: ClothesGroupData = await fbClothesGroupApi.db.read(
      id,
    );
    return new ClothesGroup(clothesGroupData);
  }
  public static async loadMultipleByRecent(
    numOfGroups: number,
  ): Promise<ClothesGroup[]> {
    const clothesGroupDatas: ClothesGroupData[] = await fbClothesGroupApi.db.readDocumentsByRecent(
      numOfGroups,
    );
    const clothesGroups: ClothesGroup[] = [];

    _.forEach(clothesGroupDatas, clothesGroupData => {
      clothesGroups.push(new ClothesGroup(clothesGroupData));
    });

    console.log('loadMultipleByRecent() clothesGroups', clothesGroups);
    return clothesGroups;
  }
  public static initNextIndex() {
    fbClothesGroupApi.db.initNextDocuments();
  }

  public id: string = '';
  public name: string = '';
  public clothIds: string[] = [];
  public imageUrl: string = '';
  public createdAt: number = 0;
  public gender: string = '';
  public weather: string[] = [];
  public temperature: number[] | string[] = [];
  public thickness: string = '';
  public hashtags: string[] = [];

  // save() 할 때 활용하기위해 Cloth instance들을 저장해두는 곳
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

  private constructor(clothesGroupData?: ClothesGroupData) {
    if (!_.isNil(clothesGroupData)) {
      this.id = clothesGroupData.id;
      this.name = clothesGroupData.name;
      this.clothIds = clothesGroupData.clothIds;
      this.imageUrl = clothesGroupData.imageUrl;
      this.createdAt = clothesGroupData.createdAt;
    }
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

  public async save(outlineImage: Blob) {
    // 전체 스크린샷 이미지 저장
    await fbClothesGroupApi.storage.create(this.id, outlineImage);
    // 전체 스크린샷 가져오기
    this.imageUrl = await fbClothesGroupApi.storage.read(this.id);

    // temperature refining
    this.temperature = this.convertTemperaturesToNumber(this
      .temperature as string[]);

    // db 저장
    await fbClothesGroupApi.db.create({
      id: this.id,
      name: this.name,
      clothIds: this.clothIds,
      imageUrl: this.imageUrl,
      createdAt: new Date().getTime(),
      gender: this.gender,
      weather: this.weather,
      temperature: this.temperature,
      thickness: this.thickness,
      hashtags: this.hashtags,
    });
    // clothes 중 null이 아닌 cloth들을 모두 저장.
    // const clothPromises: Array<Promise<void>> = [];
    // _.forEach(this.clothes, cloth => {
    //   if (!_.isNil(cloth)) {
    //     clothPromises.push(cloth.save());
    //   }
    // });
    // await Promise.all(clothPromises);
  }
  public delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      const promise: Array<Promise<void>> = [
        fbClothesGroupApi.db.delete(this.id),
        fbClothesGroupApi.storage.delete(this.id),
      ];
      Promise.all(promise)
        .then(responses => {
          console.log('clothesGroup deleted successful');
          resolve();
        })
        .catch(error => {
          console.error('clothesGroup delete() error');
          reject();
        });
    });
  }
  private convertTemperaturesToNumber(temperatureStrings: string[]): number[] {
    const temperatureNumbers: number[] = [];
    _.forEach(temperatureStrings, tString => {
      let tNumber: number = 0;
      switch (tString) {
        case '4도 이하':
          tNumber = 4;
          break;
        case '5 ~ 9도':
          tNumber = 9;
          break;
        case '12 ~ 16도':
          tNumber = 16;
          break;
        case '17 ~ 19도':
          tNumber = 19;
          break;
        case '20 ~ 22도':
          tNumber = 22;
          break;
        case '23 ~ 27도':
          tNumber = 27;
          break;
        case '28도 이상':
          tNumber = 28;
          break;
      }
      temperatureNumbers.push(tNumber);
    });
    return temperatureNumbers;
  }
}
