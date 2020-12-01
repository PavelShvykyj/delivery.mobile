import { first } from 'rxjs/operators';
import { UpsertOrderRecord, DeleteOrderRecord } from './../editorder.actions';
import { IOrderGoodsRecordWithEntity } from './../../models/order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

import { selectAllOrderGoods } from '../editorder.selectors';
import { DialogstringinputComponent } from 'src/app/baseelements/dialogstringinput/dialogstringinput.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'order-goods-list',
  templateUrl: './order-goods-list.component.html',
  styleUrls: ['./order-goods-list.component.scss']
})
export class OrderGoodsListComponent implements OnInit {

  displayedColumns : string[] = ['good' ,'quantity','price' ,'comment','buttonsgroup'];
  dataSource : MatTableDataSource<IOrderGoodsRecordWithEntity>  = new MatTableDataSource([]);
  ordersusbs:Subscription;
  total:number = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private store: Store<AppState>,
              public dialog: MatDialog ) { }

  ngOnInit() {
    this.ordersusbs = this.store.pipe(select(selectAllOrderGoods))
    .subscribe(orderrecords=>{
      
      this.dataSource.data=orderrecords;
      this.total = this.GetOrderTotal();

    });

    
  }
  
  GetOrderTotal():number {
    let total = 0;
    this.dataSource.data.forEach(record => total=total+record.quantity*record.good.price);
    return total;
  } 

  get goodsvalid() {
    return true
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.ordersusbs.unsubscribe();
  }

  IncrQuantity(record:IOrderGoodsRecordWithEntity) {
    record.quantity = 1;
    this.store.dispatch(UpsertOrderRecord({record}));
  }

  DecrQuantity(record) {
    record.quantity = -1;
    this.store.dispatch(UpsertOrderRecord({record}));

  }

  OnRecordClick(record ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.minHeight="25wh"
    dialogConfig.minWidth="25wv"
    
    dialogConfig.data = {title: `Комментарий для : ${record.good.name}` , answer:record.comment}

    const DialogRef : MatDialogRef<DialogstringinputComponent>  = this.dialog.open(
      DialogstringinputComponent,
      dialogConfig);
      DialogRef.afterClosed().pipe(first()).subscribe(res =>{
      record.comment = res.answer;
      record.quantity = 0; 
      this.store.dispatch(UpsertOrderRecord({record}));
    });


  }

 

  Del(record) {
    this.store.dispatch(DeleteOrderRecord({recordid:record.id}));
  }

}
