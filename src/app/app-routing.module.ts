import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuResolver } from './menu/menu.resolver';
import { OrderEditComponent } from './order/order-edit/order-edit.component';


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
    path: 'Order',
    component: OrderEditComponent
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
