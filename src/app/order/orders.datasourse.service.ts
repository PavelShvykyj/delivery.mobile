import { FbService } from './../fb.service';
import { IOrderWithDirty } from './../models/order';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrdersDatasourseService {

  constructor(
    private dbservice : FbService
    ) { }

  fb = this.dbservice._fdb;  
  db = this.fb.database();

  get timestamp() {
    return this.fb.database.ServerValue.TIMESTAMP;
  }



  CreateOrder(neworder: IOrderWithDirty) {
    
    
    return from(this.db.ref('orders').push({...neworder,externalid:"", creation: this.timestamp}))
    .pipe(
      
      catchError(err => {
      neworder.comment = JSON.stringify(err);
      return throwError(neworder)}
      ),
      map(snap => {return {...neworder, id: snap.key}})
    );
  }


  
  AddOrder(data : IOrderWithDirty) : Observable<any> {
    //return throwError(data);
    return this.CreateOrder(data);
  }

  async RemoveOrder(id:string) : Promise<void> {
    return this.db.ref('orders/'+id).remove();
  }

  // OnOrdersChanged(data: firebase.database.DataSnapshot) {
  //   this.store.dispatch(OrderActions.OrdersUpdated({ orders: [{ ...data.val(), id: data.key }] }));
  // }

  // OnOrdersRemoved(data: firebase.database.DataSnapshot) {
  //   this.store.dispatch(OrderActions.OrdersDeleted({ orders: [data.key] }))
  // }

  // OdrdersChangesStart() {
  //   this.db.database.ref('orders').on('child_removed', this.OnOrdersRemoved.bind(this));
  //   this.db.database.ref('orders').on('child_changed', this.OnOrdersChanged.bind(this));
  //   this.db.database.ref('orders').on('child_added', this.OnOrdersChanged.bind(this));
  // }

  // OdrdersChangesStop() {
  //   this.db.database.ref('orders').off('child_removed');
  //   this.db.database.ref('orders').off('child_changed');
  //   this.db.database.ref('orders').off('child_added');
  // }


}
