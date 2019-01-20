import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUser(user: User){
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
}
