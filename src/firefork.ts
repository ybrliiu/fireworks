import * as p5 from 'p5';
import { Particle } from './particle';

export class Firework {
  // 花火の色相
  private hue: number;
  private particle: Particle;
  private particles: Particle[];
  private isExploded: boolean = false;
  private gravity: p5.Vector;

  constructor(particle, gravity) {
    this.gravity = gravity;
    this.particle = particle;
    this.hue = particle.hue;
    this.particles = [];
  }

  // 花火か打ち上がったのかをチェックするメソッド
  public done(): boolean {
    return this.isExploded && this.particles.length === 0;
  }

  public update(): void {
    if ( this.isExploded ) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(this.gravity);
        this.particles[i].update();
        if (this.particles[i].done()){
          this.particles.splice(i, 1);
        }
      }
    }
    else {
      this.particle.applyForce(this.gravity);
      this.particle.update();
      if ( this.particle.vector.y >= 0 ) {
        this.isExploded = true;
        this.explode();
      }
    }
  }

  public explode(): void {
    for (let i = 0; i < 100; i++){
      const p = new Particle(
        this.particle.processing,
        this.particle.position,
        this.hue,
        false
      );
      this.particles.push(p);
    }
  }

  public show(): void {
    if ( this.isExploded ) {
      this.particles.forEach(particle => {
        particle.show()
      });
    }
    else {
      this.particle.show();
    }
  }

}
