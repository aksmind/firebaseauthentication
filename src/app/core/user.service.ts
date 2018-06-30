import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { resolve } from 'url';

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  getCurrentUser(){
    return new Promise<any>((resolve,reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if(user){
          resolve(user);
        }
        else{
          reject('User Not Logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve,reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }), err => reject(err)
    })
  }

}
