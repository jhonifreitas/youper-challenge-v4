import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../interfaces/user';
import { Message } from '../../interfaces/message';
import { environment } from '../../../environments/environment';
import { FunctionsService } from '../functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = environment.api_url;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private functions: FunctionsService
  ) {
    this.userCollection = db.collection<User>('users');
  }

  // MESSAGES
  getMessages() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'messages/')
      .subscribe(res => {
        resolve(res)
      }, err => {
        this.showError(err);
        reject(err)
      })
    })
  }

  putMessage(id: number, message: Message) {
    return new Promise((resolve, reject) => {
      this.http.put(this.API_URL + 'messages/'+id, message)
      .subscribe(res => {
        resolve(res)
      }, err => {
        this.showError(err);
        reject(err)
      })
    })
  }

  // USER
  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  putUser(id: string, user: User) {
    delete user.id;
    return this.userCollection.doc(id).update(user);
  }

  // SHOW ERROR
  showError(error){
    this.functions.message('Error! '+error);
  }
}
