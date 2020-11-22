import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { menuMainFolderSelected } from '../menu/menu.actions';
import { AppState } from '../reducers';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  defoultpicture : string = "assets/main.jpg"; //"https://firebasestorage.googleapis.com/v0/b/chilidelivery-42f84.appspot.com/o/webgoodpicures%2F5.jpg?alt=media&token=9c93dd85-301f-4a7c-ad72-24592aa5b8c5";  
  
  constructor(private router : Router, private store: Store<AppState>) {
    
    
  }
 
  GoTomenu() {
    this.store.dispatch(menuMainFolderSelected({id:""}));
    this.router.navigateByUrl("Menu")
  }
}
