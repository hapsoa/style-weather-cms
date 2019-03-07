import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  private beforeCreate() {
    // console.log('before');
  }

  private created() {
    // console.log('oh');
  }
}
