import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService, inscriptionData } from '../service/user.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  public nom:string = ""
  public prenom:string = ""
  public email:string = ""
  public password:string = ""
  public confirmPassword:string = ""
  public isToastOpen:Boolean = false
  public toastText:string = ""

  public loader = this.loadingCtrl.create({
    message: "Inscription en cours...",
  });


  constructor(private router:Router,private loadingCtrl: LoadingController, private userService:UserService) { }

  ngOnInit() {
    this.nom = ""
    this.prenom = ""
    this.email = ""
    this.password = ""
    this.confirmPassword = ""
    this.isToastOpen = false
    this.toastText = ""
  }

  async presentLoading() {
    (await this.loader).present();
  }

  async closeLoading() {
    (await this.loader).dismiss();
  }
  startInscription(){
    this.presentLoading()
    this.setToastOpen(false)
    if(this.nom=="" || this.prenom==""|| this.email=="" || this.password=="" || this.confirmPassword==""){
      this.toastText = "Veuillez remplir correctement tous les champs!"
      this.setToastOpen(true)
      this.closeLoading()
    }

    else if(this.password!=this.confirmPassword){
      this.toastText = "Les mots de passe doivent être identique"
      this.setToastOpen(true)
      this.closeLoading
    }
    else{
      var inscriptionData: inscriptionData={id:-1, name:this.nom, prenom:this.prenom, email:this.email, password:this.password}
      this.userService.userInscription(inscriptionData).subscribe((Response: HttpResponse<any>)=>{
        this.router.navigateByUrl('/connexion')
        this.closeLoading()

      }, error=>{
        this.toastText = "Erreur d'inscription: Veuillez verifier votre connexion et réessayer !:" + error.message
        this.setToastOpen(true)
        this.closeLoading()
      }
      )
    }
  }

  setToastOpen(open:Boolean){
    this.isToastOpen = open;
  }

}
