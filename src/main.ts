import * as p5 from 'p5';
import { Firework } from './firefork';
import { Particle } from './particle';

const sketch = (processing: p5) => {
  const fireworks: Firework[] = [];
  const gravity = processing.createVector(0, 0.4);

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

  processing.draw = () => {
    processing.colorMode(processing.RGB); // 花火を出す色の指定の仕方
    processing.background(0, 0, 0, 25); // 背景に少し透明なのを重ねてだんだん消えて行くように

    if (Math.random() < 0.05) {
      const firework = new Firework(
        new Particle(
          processing,
          processing.createVector(
            processing.random(processing.windowWidth),
            processing.windowHeight
          ),
          Math.floor(Math.random() * 255),
          true
        ),
        gravity
      );
      if (fireworks.length < 5) {
        fireworks.push(firework);
      }
    }

    //　花火の見せ方
    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].show();
      if (fireworks[i].done()) {
        fireworks.splice(i, 1);
      }
    }
  };
};

new p5(sketch);
