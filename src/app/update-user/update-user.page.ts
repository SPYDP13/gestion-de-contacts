import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  public nom:String = UserService.userNom
  public prenom:String = UserService.userPrenom
  public email:String = UserService.userEmail
  public isToastOpen:Boolean = false
  public toastText:String = ""

  constructor() { }

  ngOnInit() {
  }

  startInscription(){
    this.setToastOpen(false)
    if(this.nom=="" || this.prenom==""|| this.email=="" ){
      this.toastText = "Veuillez remplir correctement tous les champs!"
      this.setToastOpen(true)
    }
  }

  setToastOpen(open:Boolean){
    this.isToastOpen = open;
  }

}
