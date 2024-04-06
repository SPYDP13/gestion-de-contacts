import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public inscriptionBtn = document.getElementsByClassName('inscriptionBtn');
  public ConnexionBtn = document.getElementsByClassName('connexionBtn');
  public titre = document.getElementsByClassName('titre');

  constructor() {
    setTimeout(this.annimation1, 500);
    setTimeout(this.annimation2, 2500);
    setTimeout(this.titreAnnimation, 4000);
  }

  annimation1 = () => {
    this.inscriptionBtn[0].classList.add('InscriptionAnimationCSS');
    this.ConnexionBtn[0].classList.add('ConnexionAnimationCSS');
}
  annimation2 = () => {
    this.inscriptionBtn[0].classList.add('InscriptionAnimationCSS2');
    this.ConnexionBtn[0].classList.add('ConnexionAnimationCSS2');
}
  titreAnnimation = () => {
    this.titre[0].classList.add('titreAnimationCSS');
}

}
