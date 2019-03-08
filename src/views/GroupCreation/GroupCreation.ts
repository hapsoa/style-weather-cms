import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component({})
export default class GroupCreation extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    form: any;
    image: any;
  };

  public formValid: boolean = true;

  public name: string = '';
  public nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 20) || 'Name must be less than 20 characters',
  ];

  public linkUrl: string = '';
  public linkUrlRules = [
    (v: string) => !!v || 'Link is required',
    // (v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
  ];
  // public select = null;
  // public items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  // public checkbox: boolean = false;

  public imageName: string = '';
  public imageUrl: string | ArrayBuffer | null = '';
  public imageFile: File | null = null;
  public imageRules = [(v: string) => !!v || 'Image is required'];

  public validate() {
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.name, 'linkUrl', this.linkUrl);
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public pickFile() {
    this.$refs.image.click();
  }

  public onFilePicked(e: any) {
    const files = e.target.files;
    if (files[0] !== undefined) {
      this.imageName = files[0].name;
      if (this.imageName.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener('load', () => {
        this.imageUrl = fr.result;
        this.imageFile = files[0]; // this is an image file that can be sent to server...
        // console.log('imageFile', this.imageFile);
      });
    } else {
      this.imageName = '';
      this.imageFile = null;
      this.imageUrl = '';
    }
  }

  private created() {
    this.$store.state.isMainPage = false;
  }
}
