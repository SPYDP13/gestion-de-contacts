import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { StorageService } from './storage.service';

export interface connexionResult{
  status:Boolean;
  id: number;
}

export interface contactData{
  id: number;
  contact:string;
  nom: string;
  prenom: string;
  groupe:group;
}


export interface group{
  id: number;
  name: string;
}

export interface inscriptionData{
  id: number;
  name:string;
  prenom:string;
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static userNom: string
  public static userPrenom: string
  public static userEmail: string
  public static userToken: string

  public baseUrl: string=environment.base_url

  constructor(private http:HttpClient, private storageService:StorageService) { }

  initUser(nom: string, prenom: string, email: string, token:string){
    UserService.userNom = nom
    UserService.userPrenom = prenom
    UserService.userEmail = email
    this.storageService.setToken(token)
  }


  userConnexion(connectDto:any):Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.baseUrl+"connexion", connectDto, {observe: 'response'})
  }

  userInscription(inscriptionData:inscriptionData):Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(this.baseUrl+"inscription", inscriptionData, {observe: 'response', withCredentials: true })
  }

  getUserContacts(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.storageService.getToken(),
      });
    return this.http.get<any>(this.baseUrl+"contacts", {observe:'response', headers: headers})
  }

  addContact(contactData: contactData){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.storageService.getToken(),
    });
    return this.http.post<any>(this.baseUrl+"Creer", contactData, {observe:'response', headers: headers, withCredentials: true})

  }

  updateContact(contactData: contactData){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.storageService.getToken(),
    });
    return this.http.put<any>(this.baseUrl+"modifier/"+contactData.id, contactData, {observe:'response', headers: headers, withCredentials: true})
  }

  deleteContact(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.storageService.getToken(),
    });
    return this.http.delete<any>(this.baseUrl+"supprimer/"+id, {observe:'response', headers: headers, withCredentials: true})
  }


}
