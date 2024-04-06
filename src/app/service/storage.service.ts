import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { this.init() }

  async init() {
    await this.storage.create();
  }

  setToken(token: string) {
    this.storage.set('token', token);
  }

  getToken(): any {

    this.storage.get('token')
      .then((token: string) =>{
        return token;
      })
      .catch((error: any) =>{
        return ""
      })
  }

  removeToken() {
    this.storage.remove('token');
  }
}
