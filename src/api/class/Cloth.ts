import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { fbClothApi } from '@/api/firebase';
import { stringify } from 'querystring';

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
  name: string;
  linkUrl: string;
  gender: string | null;
  majorClass: MajorClass | null;
  minorClass: string | null;
  weather: string[];
  temperature: string[];
  thickness: string | null;
  color: string | null;
  imageUrl: string | ArrayBuffer | null;
  createdAt: number;
  hashtags: string[];
}

export default class Cloth {
  public static create(majorClass?: MajorClass): Cloth {
    const newCloth = new Cloth();
    newCloth.data.id = uuidv4();
    if (!_.isNil(majorClass)) {
      newCloth.data.majorClass = majorClass;
    }
    return newCloth;
  }

  public static async load(id: string): Promise<Cloth> {
    const clothData: ClothData = await fbClothApi.db.read(id);
    return new Cloth(clothData);
  }
  public static async loadMultipleByRecent(
    numOfClothes: number,
  ): Promise<Cloth[]> {
    const clothDatas: ClothData[] = await fbClothApi.db.readDocumentsByRecent(
      numOfClothes,
    );
    const clothes: Cloth[] = [];

    _.forEach(clothDatas, clothData => {
      clothes.push(new Cloth(clothData));
    });

    console.log('loadMultipleByRecent() clothes', clothes);
    return clothes;
  }
  public static initNextIndex() {
    fbClothApi.db.initNextDocuments();
  }
  public static getByQuery(queryObject: {
    numOfClothes: number;
    searchInput: string;
    majorClass: string | null;
    minorClass: string | null;
  }): Promise<Cloth[]> {
    return new Promise((resolve, reject) => {
      fbClothApi.db
        .readByQuery(queryObject)
        .then(response => {
          const clothes: Cloth[] = _.map(
            response,
            clothData => new Cloth(clothData),
          );
          resolve(clothes);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public data: ClothData = {
    id: '',
    name: '',
    linkUrl: '',
    gender: null,
    majorClass: null,
    minorClass: null,
    weather: [],
    temperature: [],
    thickness: null,
    color: null,
    imageUrl: null,
    createdAt: 0,
    hashtags: [],
  };
  // public id: string = '';
  // public majorClass: MajorClass | null = null;

  // public linkUrl: string = '';
  // public gender: string[] = [];
  // public minorClass: string | null = null;
  // public weather: string | null = null;
  // public temperature: string | null = null;
  // public thickness: string[] = [];
  // public color: string | null = null;
  // public createdAt: number = 0;
  // public hashtags: string[] = [];
  // public name: string = '';
  // public imageUrl: string | ArrayBuffer | null = null;

  public imageName: string = '';
  public imageFile: File | null = null;

  // 모든 데이터가 다 있는지 체크하는 기능
  public canSave: boolean = false;

  private constructor(clothData?: ClothData) {
    if (!_.isNil(clothData)) {
      // this.id = clothData.id;
      // this.linkUrl = clothData.linkUrl;
      // this.gender = clothData.gender;
      // this.majorClass = clothData.majorClass;
      // this.minorClass = clothData.minorClass;
      // this.weather = clothData.weather;
      // this.temperature = clothData.temperature;
      // this.thickness = clothData.thickness;
      // this.color = clothData.color;
      // this.imageUrl = clothData.imageUrl;
      // this.createdAt = clothData.createdAt;
      // this.hashtags = clothData.hashtags;
      // this.name = clothData.name;
      this.data = clothData;
    }
  }

  public async saveToCreate(): Promise<void> {
    if (!_.isNil(this.imageFile)) {
      // storage에 저장하고, url을 가져온다.
      await fbClothApi.storage.create(this.data.id, this.imageFile);
      this.data.imageUrl = await fbClothApi.storage.read(this.data.id);

      // db에 저장한다.
      await fbClothApi.db.create(this.data);
    } else {
      throw new Error('이미지 파일이 없는데 cloth.save() 시도하고 있다.');
    }
  }
  public async saveToUpdate() {
    // 이미지가 바뀌었다면
    if (!_.isNil(this.imageFile)) {
      //
    } else {
      // 이미지는 바뀌지 않았다면, metadata만 update 시킨다.
      // await fbClothApi.s
    }
  }
  public delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      const promise: Array<Promise<void>> = [
        fbClothApi.db.delete(this.data.id),
        fbClothApi.storage.delete(this.data.id),
      ];
      Promise.all(promise)
        .then(responses => {
          console.log('cloth deleted successful');
          resolve();
        })
        .catch(error => {
          console.error('cloth delete() error');
          reject();
        });
    });
  }
}
