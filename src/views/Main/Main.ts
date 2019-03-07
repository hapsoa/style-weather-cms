import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

@Component({})
export default class Main extends Vue {
  private beforeCreate() {
    User.setAuthOnListener(() => {
      // loading을 풀어준다. 그냥 화면이 알아서 될듯.
    });
    User.setAuthOffListener(() => {
      // /login 페이지로 보낸다.
      this.$router.push({ name: 'login' });
    });
  }
}
