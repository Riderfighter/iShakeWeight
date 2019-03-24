import { Component, ViewChild } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import random from '@angular-devkit/schematics/src/rules/random';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Shake it REAL good
  // 😩😩😩😩😩😩😩😩😩

  colors = ['#FFFFF', '#C0C0C0', '#808080', '#000000', '#FF0000', '#800000', '#FFFF00', '#808000', '#00FF00', '#008000', '#00FFFF',
    '#008080', '#0000FF', '#000080', '#FF00FF', '#800080'];
  currentColor = 0;

  soundEffects = ['assets/audio/applause.mp3'];
  constructor(private screenOrientation: ScreenOrientation, private insomnia: Insomnia) {
    this.screenOrientation = screenOrientation;
    this.insomnia = insomnia;

    this.insomnia.keepAwake()
        .then(
            () => console.log('success'),
            () => console.log('error')
        );

    window.addEventListener('deviceorientation', (event) => {
      // console.log(event.beta);
      // limits = 320 && 20
      if ( 20 > -(event.alpha - 360) || -(event.alpha - 360) > 320) {
        document.getElementById('shakeweight').setAttribute('style', `${document.getElementById('shak' +
            'eweight').getAttribute('style')}; transform: rotate(${-(event.alpha - 360)}deg);`);
      }
    });

    window.addEventListener('devicemotion', (event) => {
      const motionThresh = 20;
      if ((event.acceleration.z + event.acceleration.y) > motionThresh) {
        window.navigator.vibrate(1000);
      }
      if ((event.acceleration.z + event.acceleration.y) > motionThresh + 40) {
        const randomNum = Math.floor((Math.random() * 5));
        if (randomNum <= 3) {
          const audio = new Audio(this.soundEffects[randomNum]);
          audio.play().then(() => {
          }, (error) => {
            console.log('FML');
          });
        }
        if (this.currentColor === 15) {
          this.currentColor = 0;
          document.getElementById('background').setAttribute('style', `--ion-background-color: ${this.colors[this.currentColor]};`);
        } else {
          document.getElementById('background').setAttribute('style', `--ion-background-color: ${this.colors[this.currentColor++]};`);
        }
      }
    });
  }
}
