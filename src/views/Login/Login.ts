import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

@Component({})
export default class Login extends Vue {
  public async googleLogin() {
    await User.googleLogin();
    this.$router.push({ name: 'main' });
  }
}
