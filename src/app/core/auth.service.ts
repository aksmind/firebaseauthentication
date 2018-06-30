import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { resolve } from 'path';
// import { reject } from 'q';

@Injectable()
export class AuthService {

  constructor(public afauth: AngularFireAuth) { }

  doFacebookLogin(){
    return new Promise<any>((resolve,reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afauth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve,reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afauth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve,reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve,reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve,reject) => {
      if(firebase.auth().currentUser){
        this.afauth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

}
