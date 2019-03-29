import { Component, Vue } from 'vue-property-decorator';
import Bricks, { BricksInstance } from 'bricks.js';
import { ClothesGroup } from '@/api/class';

@Component({})
export default class Home extends Vue {
  public bricksInstance!: BricksInstance;
  public brickArray: ClothesGroup[] = [];

  // public addBrick() {
  //   this.brickArray.push(`추가 ${this.brickArray.length + 1}`);
  // }

  private mounted() {
    const sizes = [
      { columns: 2, gutter: 10 },
      { mq: '768px', columns: 3, gutter: 25 },
      { mq: '1024px', columns: 4, gutter: 50 },
    ];

    // create an instance
    this.bricksInstance = Bricks({
      container: '.selector',
      packed: 'data-packed', // 이게 뭔지는 파악해야 함
      sizes,
    });

    this.bricksInstance.pack(); // 전체 elements를 pack()
  }

  private updated() {
    this.bricksInstance.update(); // 새로 생긴 element를 pack()
  }
}
