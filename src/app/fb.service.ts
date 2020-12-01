import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import firebase from 'firebase';
import 'firebase/database';
firebase.initializeApp(environment.firebase);


@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor() { }

  public get _fdb() {
    return firebase
  }

}
