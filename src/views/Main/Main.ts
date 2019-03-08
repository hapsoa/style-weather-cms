import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

@Component({})
export default class Main extends Vue {
  // private beforeCreate() {}
  private created() {
    this.$store.state.isMainPage = true;
  }
}
