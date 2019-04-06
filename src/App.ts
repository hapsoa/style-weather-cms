import _ from 'lodash';
import uuidv4 from 'uuid/v4';
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';
import {
  MajorClass,
  TopMinorClass,
  OnePieceMinorClass,
  BottomsMinorClass,
  OuterMinorClass,
  AccessoryMinorClass,
  ShoesMinorClass,
  BagMinorClass,
  GlassesMinorClass,
  HatMinorClass,
} from './api/class/Cloth';

@Component({})
export default class App extends Vue {
  private majorSelect: string | null = null;
  private majorClassItems: string[] = _.map(MajorClass, v => v);
  private topMinorClassItems: string[] = _.map(TopMinorClass, v => v);
  private onePieceMinorClassItems: string[] = _.map(OnePieceMinorClass, v => v);
  private bottomsMinorClassItems: string[] = _.map(BottomsMinorClass, v => v);
  private outerMinorClassItems: string[] = _.map(OuterMinorClass, v => v);
  private accessoryMinorClassItems: string[] = _.map(
    AccessoryMinorClass,
    v => v,
  );
  private shoesMinorClassItems: string[] = _.map(ShoesMinorClass, v => v);
  private bagMinorClassItems: string[] = _.map(BagMinorClass, v => v);
  private glassesMinorClassItems: string[] = _.map(GlassesMinorClass, v => v);
  private hatMinorClassItems: string[] = _.map(HatMinorClass, v => v);
  public changeMajorSelect(majorSelect: string) {
    this.majorSelect = majorSelect;
  }
  public get minorSelect(): string[] {
    console.log('majorSelect Changed');
    switch (this.majorSelect) {
      case MajorClass.Top: {
        return this.topMinorClassItems;
      }
      case MajorClass.OnePiece: {
        return this.onePieceMinorClassItems;
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

  public async logout() {
    if (!_.isNil(User.getInstance())) {
      await (User.getInstance() as User).logout();

      this.$router.push({ name: 'login' });
    } else {
      throw new Error('로그인이 안됐는데, 로그아웃하네?');
    }
  }

  public createClothesGroup() {
    this.$router.push({
      name: 'clothesgroup-creation',
    });
  }
  public createCloth() {
    this.$router.push({
      name: 'cloth-creation',
    });
  }

  get isGroupSelect() {
    if (this.$store.state.groupOrItem === 'group') {
      return true;
    } else {
      return false;
    }
  }

  private beforeCreate() {
    User.setAuthOnListener();
    User.setAuthOffListener();

    User.authOnListeners.push(() => {
      this.$store.state.isLogin = true;
      this.$store.state.isFullProgress = false;
    });
    User.authOffListeners.push(() => {
      // /login 페이지로 보낸다.
      this.$store.state.isLogin = false;
      this.$store.state.isFullProgress = false;
      this.$router.push({ name: 'login' });
    });
  }
}

//
// private majorClassItems: string[] = [
//   '상의', // top
//   '아우터',
//   '원피스',
//   '하의', // bottoms
//   '가방',
//   '신발',
//   '모자',
//   '안경',
//   '액세서리',
//   '기타',
// ];
// private topMinorClassItems: string[] = [
//   '반팔',
//   '맨투맨',
//   '긴팔',
//   '민소매',
//   '후드',
//   '셔츠/블라우스',
//   '니트/스웨터/가디건',
//   '기타',
// ];
// private onePieceMinorClassItems: string[] = ['원피스', '기타'];
// private bottomsMinorClassItems: string[] = [
//   '데님',
//   '반바지',
//   '면바지',
//   '스커트',
//   '레깅스',
//   '슬랙스',
//   '트레이닝바지',
//   '기타',
// ];
// private outerMinorClassItems: string[] = [
//   '코트',
//   '자켓',
//   '패딩',
//   '점퍼',
//   '베스트',
//   '후리스',
//   '후드집업',
//   '가디건',
//   '기타',
// ];
// private accessoryMinorClassItems: string[] = [
//   '마스크',
//   '머플러',
//   '장갑',
//   '기타',
// ];
// private shoesMinorClassItems: string[] = [
//   '구두',
//   '부츠',
//   '플랫',
//   '힐',
//   '샌들/슬리퍼',
//   '운동화',
//   '스니커즈',
//   '기타',
// ];
// private bagMinorClassItems: string[] = ['백팩', '핸드백', '기타'];
// private glassesMinorClassItems: string[] = ['썬글라스', '안경', '기타'];
// private hatMinorClassItems: string[] = [
//   '캡모자',
//   '비니',
//   '테도라',
//   '베레모',
//   '버킷',
//   '썬캡',
//   '밀짚모자',
//   '기타',
// ];
