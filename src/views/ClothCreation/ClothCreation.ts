import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { Cloth } from '@/api/class';

@Component({})
export default class App extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    imageInput: any;
    form: any;
  };

  private cloth: Cloth = Cloth.create();

  private formValid: boolean = false;

  private clothNameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) =>
      (v && v.length <= 20) || 'Name must be less than 20 characters',
  ];
  private imageRules = [(v: string) => !!v || 'Image is required'];

  private canSave: boolean = false;
  private chip2: boolean = true;
  private addingHashtag: string = '';

  public pickFile() {
    this.$refs.imageInput.click();
  }
  public onFilePicked(e: any) {
    const files = e.target.files;

    if (files[0] !== undefined) {
      this.cloth.imageName = files[0].name;
      if (this.cloth.imageName.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener('load', () => {
        this.cloth.imageUrl = fr.result;
        this.cloth.imageFile = files[0];
        // console.log('imageFile', this.imageFile);
      });
    } else {
      this.cloth.imageName = '';
      this.cloth.imageFile = null;
      this.cloth.imageUrl = '';
    }
  }

  public addHashtag() {
    // 배열에 저장한다.
    if (this.addingHashtag !== '') {
      this.cloth.hashtags.push(this.addingHashtag);
      this.addingHashtag = '';
    }
    console.log('this.cloth.hashtags', this.cloth.hashtags);
  }
  public deleteHashtag(index: number) {
    this.cloth.hashtags.splice(index, 1);
  }

  public validate() {
    // form tag validate성공 시 this.formValid를 true. return값도 true
    if (this.$refs.form.validate()) {
      // this.snackbar = true;
      console.log('name', this.cloth.name);

      this.cloth.canSave = true;
    }
  }
  public reset() {
    this.$refs.form.reset();
  }
  public resetValidation() {
    this.$refs.form.resetValidation();
  }

  public saveCloth() {
    console.log('저장');
    this.cloth.save();
  }
}
