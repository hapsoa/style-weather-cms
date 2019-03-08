import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class UploadFileTest extends Vue {
  // @ts-ignore-nextline
  public $refs: Vue['$refs'] & {
    image: any;
  };

  public title: string = 'Image Upload';
  public dialog: boolean = false;
  public imageName: string = '';
  public imageUrl: string | ArrayBuffer | null = '';
  public imageFile: string = '';

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
      });
    } else {
      this.imageName = '';
      this.imageFile = '';
      this.imageUrl = '';
    }
  }
}
