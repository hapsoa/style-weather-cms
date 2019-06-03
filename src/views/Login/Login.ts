import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

@Component({})
export default class Login extends Vue {
  public googleLogin() {
    User.googleLogin()
      .then(response => {
        this.$router.push({ name: 'main' });
      })
      .catch(error => {
        //
        console.error('login page googleLogin() error', error);
        alert('style-weather 관리자 계정만 로그인 할 수 있습니다.');
        // this.$store.state.isLogin = false;
      });
  }
}
