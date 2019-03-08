import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class GroupCreation extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    form: any;
  };

  public valid: boolean = true;
  public name: string = '';
  // public nameRules = [
  //   v => !!v || 'Name is required',
  //   v => (v && v.length <= 10) || 'Name must be less than 10 characters'
  // ];
  public email: string = '';
  // public emailRules = [
  //   v => !!v || 'E-mail is required',
  //   v => /.+@.+/.test(v) || 'E-mail must be valid'
  // ];
  public select = null;
  public items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  public checkbox: boolean = false;

  public validate() {
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  private created() {
    this.$store.state.isMainPage = false;
    console.log('lala', this.$store.state.isMainPage);
  }
}
