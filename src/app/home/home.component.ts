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
  constructor(private router : Router, private store: Store<AppState>) {
    
    
  }
 
  GoTomenu() {
    this.store.dispatch(menuMainFolderSelected({id:""}));
    this.router.navigateByUrl("Menu")
  }
}
