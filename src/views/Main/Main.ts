import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/class';

import BricksComponent from '@/components/Bricks/BricksComponent.vue';

@Component({
  components: {
    BricksComponent,
  },
})
export default class Main extends Vue {
  private created() {
    this.$store.state.isMainPage = true;
  }
}
