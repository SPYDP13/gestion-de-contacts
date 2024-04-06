import { Component, OnInit } from '@angular/core';
import { AddAlertComponent } from './add-alert/add-alert.component';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService, contactData, group } from '../service/user.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GroupManagePage } from '../group-manage/group-manage.page';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  public error_message = ""
  public viewOpen:Boolean = false;
  public deleteOpen:Boolean = false;
  public updateOpen:Boolean = false;

  public contactNom:string = "";
  public contactPrenom:string = "";
  public contactContact:string = "";
  public contactGroup:string = "";

  public updateNom:string = "";
  public updatePrenom:string = "";
  public updateContact:string = "";
  public updateIndex:number = -1;
  public updateId:number = -1;

  public UserNom:string = "";
  public UserPrenom:string = "";

  public deleteId:any ;
  public deleteIndex:any ;

  public isDeleteToastOpen:Boolean = false
  public toastDeleteText:string = ""

  public loading:boolean = true
  public searchResultText:string = ""

  public loadingMessage:string = ""


  /* alerts buttons */




  public alertButtonsDelete = [
    {
      text:'Oui',
      cssClass:'alert-button-confirm',
      handler: () => {
        this.deleteValidation()
      }
    },
    {
      text:'Non',
      cssClass:'alert-button-cancel',
      handler: () => {
      }
    },
  ];

  public alertButtonsView = [
    {
      text:'Ok',
      cssClass:'alert-button-cancel',
      handler: ()=>{
      }
    },
  ];

  public alertButtonsDeleteAccount = [
    {
      text:'Confirmer la suppression',
      cssClass:'alert-button-cancel',
      handler: () => {
      }
    },
    {
      text:'Annuler la suppression',
      cssClass:'alert-button-confirm',
      handler: () => {
      }
    },
  ];

  public alertButtonsDeconnectAccount = [
    {
      text:'Oui',
      cssClass:'alert-button-confirm',
      handler: () => {
      }
    },
    {
      text:'Non',
      cssClass:'alert-button-cancel',
      handler: () => {
      }
    },
  ];


  /*Alert Inputs */




  /* Pickers Options */
  public optionTriColumns = [
    {
      name: 'TrierBy',
      cssClass:"picker-col-first",
      options: [
        {
          text: 'Numero',
          value: 'Numero',
        },
        {
          text: 'Nom',
          value: 'Nom',
        },
        {
          text: 'Prenom',
          value: 'Prenom',
        },
        {
          text: 'Groupe',
          value: 'Groupe',
        },
      ],
    },

    {
      name: 'Ordre',
      cssClass:"picker-col-second",
      options: [
        {
          text: 'Croissant',
          value: 'Croissant',
        },
        {
          text: 'Decroissant',
          value: 'Decroissant',
        },
      ],
    },
  ];


  public optionTriButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      cssClass:'picker-button-cancel'
    },
    {
      text: 'Confirmer',
      cssClass:"picker-button-confirm",
      handler: (value:any) => {
        this.toastDeleteText = `Choix du tri: ${value.TrierBy.text} ; Ordre: ${value.Ordre.text}`
        this.setDeleteToastOpen(true)
        /*console.log(`You selected a ${value.crust.text} pizza with ${value.meat.text} and ${value.veggies.text}`);*/
      },
    },
  ];


  public optionGroupColumnsList:any[] = []

  public optionGroupColumns = [
    {
      name: 'GrouperBy',
      cssClass:"picker-col-third",
      options: this.optionGroupColumnsList

    },
  ];
  public optionGroupButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      cssClass:'picker-button-cancel'
    },
    {
      text: 'Confirmer',
      cssClass:"picker-button-confirm",
      handler: (value:any) => {
        this.toastDeleteText = `Choix du regroupement: ${value.GrouperBy.text} ; `
        this.setDeleteToastOpen(true)
      },
    },
  ];













  constructor(private alertController:AlertController, private userService:UserService, private loadingCtrl: LoadingController, private router:Router) { }

  public contactList:contactData[] = []

  public contactListFiltered:contactData[]=this.contactList


  public loader = this.loadingCtrl.create({
    message: "Veuillez patienter la fin de l'operation en cours...",
  });


  ngOnInit() {
    this.UserNom = UserService.userNom;
    this.UserPrenom = UserService.userPrenom;

    /*Initialisation de la liste des groupe pour le boutton GroupBy */
    GroupManagePage.groupList.forEach(group=>{
      this.optionGroupColumnsList.push({
          text: group.name,
          value: group.name,
      })
    })



    this.searchResultText = ""
    this.loading = true
    /*this.contactList = [
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[0], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[1], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[2], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[3], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[4], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[2], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[3], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[1], contact:"55-07-06-22"},
      {id:5, nom:'Sawadogo', prenom:"Yves Dieudonne", groupe:GroupManagePage.groupList[4], contact:"55-07-06-22"}
    ]
    this.contactListFiltered = this.contactList*/

  this.userService.getUserContacts().subscribe((Response: HttpResponse<any>)=>{
      this.contactList = [...Response.body.data]
      this.contactListFiltered = this.contactList
      console.log(Response.body)
      this.loading = false
      if(this.contactListFiltered.length == 0){
        this.searchResultText = "Aucun contact à gerer !"
      }
    },error=>{
      if(error.status == 401){
        this.router.navigateByUrl('/connexion')
      }else{
        this.loading = false
      }
    }
    )
    
  }

  async presentLoading() {
    (await this.loader).present() ;
    (await this.loader).hidden=false;
  }

  async closeLoading() {
    (await this.loader).hidden=true;
  }





  async addContactAlert(nom?: string, prenom?: string, contact?: string) {
    var cont = "+226-"
    if(contact != null){
      cont = contact
    }
    var alertInputs = [
      {
        name:"contact",
        labelPlacement:"floating",
        placeholder: 'Contact',
        value: cont
      },
      {
        name:"nom",
        labelPlacement:"floating",
        placeholder: 'Nom',
        value:nom
      },
      {
        name:"prenom",
        labelPlacement:"floating",
        placeholder: 'Prenom',
        value:prenom
      },
    ];
    var alertButtons = [
      {
        text:'Annuler',
        cssClass:'alert-button-cancel',
        handler:(alertData:any) => {
          this.error_message = ""
        }
      },
      {
        text:'Suivant',
        cssClass:'alert-button-confirm',
        role:'',

        handler: (alertData:any) => {
          this.addContactSelectGroup(alertData);
        }
      },
    ];
    const alert = await this.alertController.create({
      header: 'Ajouter un nouveau contact!',
      message: this.error_message,
      backdropDismiss: false,
      animated: true,
      buttons: alertButtons,
      inputs: alertInputs
    });

    await alert.present();
  }
  addContactSelectGroup(alertData:any){
    if(alertData.nom.trim()==""||alertData.contact.trim()==""){
      this.error_message = "Veuillez remplir connrectement tous les champs"
      this.addContactAlert()
    }else{
      this.showGroupOptions(alertData)
    }

  }
  addContact(alertData:any, group:group){
    this.presentLoading()
    var contactData:contactData = {'id':0, 'nom':alertData.nom, 'contact':alertData.contact, 'prenom':alertData.prenom, 'groupe':group}
    this.contactListFiltered.push(contactData)
    this.userService.addContact(contactData).subscribe((Response: HttpResponse<any>)=>{
    if(Response.body.status_message=='le contact a été ajouté'){
      this.contactListFiltered.push({'id':Response.body.data.id, 'nom':Response.body.data.nom, 'prenom':Response.body.data.prenom, groupe:group, 'contact':Response.body.data.contact})
      this.error_message = ""
      this.closeLoading()
      this.toastDeleteText = "Contact ajouté avec succès !"
      this.setDeleteToastOpen(true)
    }
    }, error => {
      this.error_message = "Erreur d'ajout du contact! Veuillez verifier votre connexion puis rééssayer!: " + error.message
      this.closeLoading()
      this.showGroupOptions(alertData)
    }
    )

  }

  async showGroupOptions(alertData: any) {
    var alertInputs:any[] = []
    var alertButton:any[] = [
      {
        text: 'Precedent',
        cssClass:'alert-button-cancel',
        handler: (data:any) => {
          this.addContactAlert(alertData.nom, alertData.prenom, alertData.contact)
        }
      },
      {
        text: 'Terminer',
        cssClass:'alert-button-confirm',
        handler: (data:any) => {
          this.addContact(alertData, data)
        }
      }
    ]

    GroupManagePage.groupList.forEach(optionsList =>{
      alertInputs.push({
        name: 'option '+GroupManagePage.groupList.indexOf(optionsList),
        type: 'radio',
        label: optionsList.name,
        value: optionsList,
        checked: GroupManagePage.groupList.indexOf(optionsList) === 0
      })
    })
    const alert = await this.alertController.create({
      header: 'Choix du groupe',
      subHeader:'Veuillez choisir un groupe',
      message:this.error_message,
      inputs:alertInputs,

      buttons: alertButton,
    });

    await alert.present();
  }







  async updateAlert(nom: string, contact: string, prenom:string, group:group, index:number, id:number){
    this.updateNom=nom
    this.updateContact=contact
    this.updatePrenom=prenom
    this.updateIndex=index
    this.updateId=id
    var alertInputsUpdate = [
      {
        name:"contact",
        labelPlacement:"floating",
        placeholder: 'Contact',
        value:this.updateContact
      },
      {
        name:"nom",
        labelPlacement:"floating",
        placeholder: 'Nom',
        value:this.updateNom,
      },
      {
        name:"prenom",
        labelPlacement:"floating",
        placeholder: 'Prenom',
        value:this.updatePrenom,
      },
    ];

    var alertButtonsModify = [
      {
        text:'Suivant',
        cssClass:'alert-button-confirm',
        handler: (alertData:any) => {
          this.updateValidateSelectGroup(alertData, group, index, id);
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

    const alert = await this.alertController.create({
      header: 'Modifier le contact!',
      message: this.error_message,
      backdropDismiss: false,
      animated: true,
      buttons: alertButtonsModify,
      inputs: alertInputsUpdate
    });

    await alert.present();
  }

  updateValidateSelectGroup(alertData:any, group:any, index:number, id:number){
    if(alertData.nom.trim()==""||alertData.contact.trim()==""){
      this.error_message = "Veuillez remplir correctement tous les champs"
      this.updateAlert(this.updateNom,this.updateContact,this.updatePrenom, group,this.updateIndex, this.updateId)
    }
    else{
      this.showUpdateGroupOptions(alertData, group, index, id)
    }
  }

  updateValidate(alertData:any, group:group){
    this.presentLoading()
    var contactData:contactData = {id:this.updateId, nom:alertData.nom, contact:alertData.contact, groupe:group, prenom:alertData.prenom}
    this.userService.updateContact(contactData).subscribe((Response: HttpResponse<any>)=>{
      if(Response.body.status_message=='le contact a été modifié'){
        this.contactListFiltered[this.updateIndex]={id:Response.body.data.id, contact:Response.body.data.contact, nom:Response.body.data.nom, groupe:GroupManagePage.groupList[2], prenom:Response.body.data.prenom}
        this.error_message = ""
        this.closeLoading()
        this.toastDeleteText = "Contact modifier avec succès !"
        this.setDeleteToastOpen(true)
      }
    }, error=>{
      this.error_message = "Erreur d'ajout du contact! Veuillez verifier votre connexion puis rééssayer!: " + error.message
      this.closeLoading()
      this.showUpdateGroupOptions(alertData, group, this.updateIndex, this.updateId)
    }
    )
  }

  async showUpdateGroupOptions(alertData: any, group:group, index:number, id:number) {
    var alertInputs:any[] = []
    var alertButton:any[] = [
      {
        text: 'Precedent',
        cssClass:'alert-button-cancel',
        handler: (data:any) => {
          this.updateAlert(alertData.nom,  alertData.contact, alertData.prenom, group, index, id)
        }
      },
      {
        text: 'Terminer',
        cssClass:'alert-button-confirm',
        handler: (data:any) => {
          this.updateValidate(alertData, data)
        }
      }
    ]

    GroupManagePage.groupList.forEach(optionsList =>{
      alertInputs.push({
        name: 'option '+GroupManagePage.groupList.indexOf(optionsList),
        type: 'radio',
        label: optionsList.name,
        value: optionsList,
        checked: GroupManagePage.groupList.indexOf(optionsList) === GroupManagePage.groupList.indexOf(group)
      })
    })
    const alert = await this.alertController.create({
      header: 'Choix du groupe',
      subHeader:'Veuillez choisir un groupe',
      message:this.error_message,
      inputs:alertInputs,

      buttons: alertButton,
    });

    await alert.present();
  }











  view(nom: string, prenom:string,contact: string, group:group){
    this.contactPrenom = prenom
    this.contactNom = nom
    this.contactContact = contact
    this.contactGroup = group.name
    this.setViewOpen(true)
  }



  delete(i:any,id: any){
    this.setDeleteToastOpen(false)
    this.deleteId = id
    this.deleteIndex = i
    this.setDeleteOpen(true)
  }
  deleteValidation(){
    this.presentLoading()
    this.userService.deleteContact(this.deleteId).subscribe((Response: HttpResponse<any>)=>{
      if(Response.body.status_message=='Le contact a été supprimé'){
        this.contactListFiltered.splice(this.deleteIndex,1)
        this.toastDeleteText = "Contact supprimé avec succès!"
        this.setDeleteToastOpen(true)
        this.closeLoading()
      }
    },error=>{
      this.toastDeleteText = "Impossible de supprimer le contact: " + error.message
      this.setDeleteToastOpen(true)
      this.closeLoading()
    })

  }
  setDeleteToastOpen(open: boolean){
    this.isDeleteToastOpen = open
  }



  setViewOpen(open:Boolean){
    this.viewOpen = open;
  }
  setUpdateOpen(open:Boolean){
    this.updateOpen = open;
  }
  setDeleteOpen(open:Boolean){
    this.deleteOpen = open;
  }



  handleSearch(event:any){
    const query = event.target.value.toLowerCase();
    this.contactListFiltered = this.contactList.filter((d) => d.nom.toLowerCase().indexOf(query) > -1 || d.contact.toLowerCase().indexOf(query) > -1);
  }


  async deconnectAccountDialog(){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: "Deconneter ?",
      backdropDismiss: false,
      buttons: this.alertButtonsDeconnectAccount,
    });

    await alert.present();

  }


  async deleteAccountDialog(){
    const alert = await this.alertController.create({
      header: 'Attention, important!',
      subHeader:"Vous êtes sur le point de supprimer votre compte! Tous vous contacts et vos informations seront automatiquement supprimés!",
      message: "Voulez vous-poursuivre l'operartion",
      backdropDismiss: false,
      buttons: this.alertButtonsDeleteAccount,
    });

    await alert.present();

  }

  groupManage(){

  }

}
