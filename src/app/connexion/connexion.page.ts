import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
@Injectable()
export class ConnexionPage implements OnInit {



  public email:string = ""
  public password:string = ""
  public isToastOpen:Boolean = false
  public toastText:string = ""
  public loader = this.loadingCtrl.create({
    message: "Veuillez patienter la fin de l'operation en cours...",
  });

  constructor(private router:Router, private userService:UserService, private loadingCtrl: LoadingController) { }

  async presentLoading() {
    (await this.loader).present();
    (await this.loader).hidden = false;
  }



  async closeLoading() {
    (await this.loader).hidden = true;

  }

  ngOnInit() {
    this.email = ""
    this.password = ""
    this.isToastOpen=false
    this.toastText=""
  }

  startConnexion(){
    this.presentLoading()
    this.setToastOpen(false)
    if(this.email=="" || this.password==""){
      this.closeLoading()
      this.toastText = "Veuillez remplir correctement tous les champs!"
      this.setToastOpen(true)
    }else{
      var data:{email:string, password:string}
      data = {email:this.email, password:this.password}

      /*Starting Connexion */
      this.userService.userConnexion(data).subscribe((Response: HttpResponse<any>) =>{
        if(Response.body!.status_message!="Utilisateur connecté"){
          this.toastText = "Erreur de connexion: Mot de passe ou email incorrect"
          this.setToastOpen(true)
          this.closeLoading()
        }else{
          console.log(Response)
          this.userService.initUser(Response.body.user.name, " ", Response.body.user.email, Response.body.token)
          this.router.navigate(['/contact-list'])
          this.closeLoading()
        }

        console.log(Response)
      }, error=>{

        this.toastText = "Erreur de connexion: "+error.message
        this.setToastOpen(true)
        this.closeLoading()
      })
    }
  }

  setToastOpen(open:Boolean){
    this.isToastOpen = open;
  }


}
