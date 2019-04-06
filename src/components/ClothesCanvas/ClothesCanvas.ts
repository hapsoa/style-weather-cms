import { Component, Vue } from 'vue-property-decorator';
// import '@/lib/fabric.min.js';
import { fabric } from 'fabric';
import _ from 'lodash';
import { MajorClass } from '@/api/class/Cloth';

@Component({})
export default class ClothesCanvas extends Vue {
  public canvas!: fabric.Canvas;
  public clothImages: { [index: string]: fabric.Object } = {};
  public canSave: boolean = false;

  public addImage(url: string, currentClothMajorClass: MajorClass) {
    if (!_.isNil(this.clothImages[currentClothMajorClass])) {
      this.canvas.remove(this.clothImages[currentClothMajorClass]);
    }

    fabric.Image.fromURL(
      url,
      img => {
        // img.crossOrigin = 'anonymous';
        // img.setCrossOrigin('anonymous');
        this.canvas.add(img);
        this.clothImages[currentClothMajorClass] = this.canvas.getObjects()[
          this.canvas.getObjects().length - 1
        ];
      },
      { crossOrigin: 'anonymous' },
    );
  }

  public getCanvasHTMLElement(): HTMLCanvasElement {
    return document.getElementById('canvas') as HTMLCanvasElement;
  }

  public discardActiveObject() {
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  private mounted() {
    this.canvas = new fabric.Canvas('canvas');
  }
}
