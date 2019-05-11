import * as p5 from 'p5';
import { Fireworks } from './fireworks';

const sketch = (processing: p5) => {

  processing.setup = () => {
    // canvasの作成
    processing.createCanvas(processing.windowWidth, processing.windowHeight);
    // 花火を出す色の指定の仕方
    processing.colorMode(processing.HSB);
    // 線の色を設定
    processing.stroke(255);
    // 線の太さ
    processing.strokeWeight(4);
    // 背景を黒く指定
    processing.background(0);
  };

  processing.windowResized = () => {
    processing.resizeCanvas(processing.windowWidth, processing.windowHeight);
  };

  const fireworks = new Fireworks(processing);

  processing.draw = () => {
    processing.colorMode(processing.RGB); // 花火を出す色の指定の仕方
    processing.background(0, 0, 0, 25); // 背景に少し透明なのを重ねてだんだん消えて行くように

    fireworks.update();
    fireworks.show();
  };
};

new p5(sketch);
