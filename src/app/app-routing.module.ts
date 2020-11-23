import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { resolve } from 'dns';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuResolver } from './menu/menu.resolver';


const routes: Routes = [
  {
    path: 'Menu',
    component: MenuListComponent,
    resolve : {MenuLoaded : MenuResolver},

  },

  {
    path: 'Home',
    component: HomeComponent
    
  },

  { 
    path: '**', 
    component: HomeComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
