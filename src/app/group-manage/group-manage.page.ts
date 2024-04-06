import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.page.html',
  styleUrls: ['./group-manage.page.scss'],
})
export class GroupManagePage implements OnInit {
  static groupList:any[]=[
    {'id':2, 'name':"Amis"},
    {'id':2, 'name':"Famille"},
    {'id':2, 'name':"Etudes"},
    {'id':2, 'name':"Camarades"},
    {'id':2, 'name':"Prière"},];
  groupListFiltered:any[]=[];
  loading:boolean = true;
  searchResultText:string =""
  error_message:string = ""

  constructor(private alertController:AlertController) { }

  ngOnInit() {
    GroupManagePage.groupList = [
      {'id':2, 'name':"Amis"},
      {'id':2, 'name':"Famille"},
      {'id':2, 'name':"Etudes"},
      {'id':2, 'name':"Camarades"},
      {'id':2, 'name':"Prière"},
    ]

    this.groupListFiltered = GroupManagePage.groupList
    this.loading = false
  }

  async showAddAlert(){
    var alertButtons = [
      {
        text:'Ajouter',
        cssClass:'alert-button-confirm',
        role:'',

        handler: (alertData:any) => {
          this.addGroup(alertData);
        }
      },
      {
        text:'Annuler',
        cssClass:'alert-button-cancel',
        handler:(alertData:any) => {
          this.error_message = ""
        }
      },
    ];
    var alertInputs = [
      {
        name:"nom",
        labelPlacement:"floating",
        placeholder: 'Nom',
        value:""
      },
    ];
    const alert = await this.alertController.create({
      header: 'Ajouter un nouveau groupe!',
      message: this.error_message,
      backdropDismiss: false,
      animated: true,
      buttons: alertButtons,
      inputs: alertInputs
    });

    await alert.present();
  }

  addGroup(alertData:any) {
    if(alertData.nom.trim()==""){
      this.error_message = "Veuillez remplir correctement tous les champs!"
      this.showAddAlert()
    }else{
      GroupManagePage.groupList.push({'id':2, 'name': alertData.nom})
      this.error_message = ""
    }
  }

  async showUpdateAlert(position:number,id:number, nom:string){
    var alertButtons = [
      {
        text:'Modifier',
        cssClass:'alert-button-confirm',
        role:'',

        handler: (alertData:any) => {
          this.updateGroup(alertData,position,id);
        }
      },
      {
        text:'Annuler',
        cssClass:'alert-button-cancel',
        handler:(alertData:any) => {
          this.error_message = ""
        }
      },
    ];
    var alertInputs = [
      {
        name:"nom",
        labelPlacement:"floating",
        placeholder: 'Nom',
        value:nom
      },
    ];
    const alert = await this.alertController.create({
      header: "Modifer le nom d'un groupe!",
      message: this.error_message,
      backdropDismiss: false,
      animated: true,
      buttons: alertButtons,
      inputs: alertInputs
    });

    await alert.present();
  }

  updateGroup(alertData:any, position:number, id:number) {
    if(alertData.nom.trim()==""){
      this.error_message = "Veuillez remplir correctement tous les champs!"
      this.showUpdateAlert(position, this.groupListFiltered[position].id, this.groupListFiltered[position].nom)
    }else{
      GroupManagePage.groupList[position]= {'id':2,'name':alertData.nom.trim()}
      this.error_message = ""
    }
  }


  async showDeleteAlert(position:number,id:number, nom:string){
    var alertButtons = [
      {
        text:'Oui',
        cssClass:'alert-button-confirm',
        role:'',

        handler: (alertData:any) => {
          this.deleteGroup(position,id);
        }
      },
      {
        text:'Non',
        cssClass:'alert-button-cancel',
        handler:(alertData:any) => {
          this.error_message = ""
        }
      },
    ];

    const alert = await this.alertController.create({
      header: "Suppression d'un groupe",
      message: "Voulez-vous vraiment supprimer le groupe "+nom+" ???",
      backdropDismiss: false,
      animated: true,
      buttons: alertButtons,
    });
    await alert.present();
  }

  deleteGroup(position:number,id:number){
    GroupManagePage.groupList.splice(position, 1);
  }

  async showDeleteAllAlert(){
    var alertButtons = [
      {
        text:'Oui',
        cssClass:'alert-button-confirm',
        role:'',

        handler: (alertData:any) => {
          this.deleteAllGroup();
        }
      },
      {
        text:'Non',
        cssClass:'alert-button-cancel',
        handler:(alertData:any) => {
          this.error_message = ""
        }
      },
    ];

    const alert = await this.alertController.create({
      header: "Suppression d'un groupe",
      message: "Voulez-vous vraiment vider la liste groupe ??? (cette action est irreversible)",
      backdropDismiss: false,
      animated: true,
      buttons: alertButtons,
    });
    await alert.present();
  }

  deleteAllGroup(){
    this.searchResultText = "Aucun groupe à gérer"
    GroupManagePage.groupList.splice(0, GroupManagePage.groupList.length );
  }
}
