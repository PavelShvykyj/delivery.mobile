import { Router } from '@angular/router';
import { map, first, filter, concatMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { EditingOrder } from '../editorder.selectors';
import { CreateOrder } from '../editorder.actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'order-toolbar',
  templateUrl: './order-toolbar.component.html',
  styleUrls: ['./order-toolbar.component.scss']
})
export class OrderToolbarComponent  {
  constructor(private snackBar: MatSnackBar,
    private router : Router,
    private store: Store<AppState>
  ) { }

  GotoMenu() {
    this.router.navigateByUrl("Menu");
  }  

  OrderValid(EditingOrder) {
    if (EditingOrder.addres.length > 1 && EditingOrder.phone.length == 10 && EditingOrder.goods.length > 0 ) {
      return true
    } else {
      this.snackBar.open("Заполните контакты ...", "OK", { duration: 2000, panelClass: ['snack-err'] });
      return false;
    }
  }

  Pay() {
    this.snackBar.open(" В разработке ...", "OK", { duration: 2000, panelClass: ['snack-info'] })
  }

  CreateOrder() {
    this.store.pipe(
      select(EditingOrder),
      first(),
      filter(EditingOrder => this.OrderValid(EditingOrder) == true),
      map(order => {
        this.store.dispatch(CreateOrder({ order: { ...order, goods: order.goods.map(el => { return { ...el, dirtyid: el.good.filials } }), isDeleted: false, id: "", externalid: "", isSelected: false } }))
      }))
      .subscribe(
        res => { },
        err => {
          this.snackBar.open("Что то  пошло не так", "OK", { duration: 2000, panelClass: ['snack-err'] })
        });
  }
}
