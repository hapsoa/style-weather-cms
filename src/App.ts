import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

@Component({})
export default class App extends Vue {
  private groupOrItem: string = 'group';
  private majorSelect: string | null = null;

  private majorClassItems: string[] = [
    '상의', // top
    '아우터',
    '원피스',
    '하의', // bottoms
    '가방',
    '신발',
    '모자',
    '안경',
    '악세서리'
  ];
  private topMinorClassItems: string[] = [
    '반팔',
    '맨투맨',
    '긴팔',
    '민소매',
    '후드',
    '셔츠/블라우스',
    '니트/스웨터/가디건'
  ];
  private bottomsMinorClassItems: string[] = [
    '데님',
    '반바지',
    '면바지',
    '스커트',
    '레깅스',
    '슬랙스',
    '트레이닝바지'
  ];
  private outerMinorClassItems: string[] = [
    '코트',
    '자켓',
    '패딩',
    '점퍼',
    '베스트',
    '후리스',
    '후드집업',
    '가디건'
  ];

  public changeMajorSelect(majorSelect: string) {
    this.majorSelect = majorSelect;
  }

  public async logout() {
    if (!_.isNil(User.getInstance())) {
      await (User.getInstance() as User).logout();

      this.$router.push({ name: 'login' });
    } else {
      throw new Error('로그인이 안됐는데, 로그아웃하네?');
    }
  }

  get minorSelect(): string[] {
    switch (this.majorSelect) {
      case '상의': {
        return this.topMinorClassItems;
      }
      case '하의': {
        return this.bottomsMinorClassItems;
      }
      case '아우터': {
        return this.outerMinorClassItems;
      }
      default: {
        return [];
      }
    }
  }

  get isGroupSelect() {
    if (this.groupOrItem === 'group') {
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
