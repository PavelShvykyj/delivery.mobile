
import { CreateOrder, OrderCreated, OrderCreatedErr } from './editorder.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../reducers';
import { concatMap, map, tap, catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { YndialogComponent } from '../baseelements/yndialog/yndialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OrdersDatasourseService } from './orders.datasourse.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EditOrderEffects {

    CreateOrders$ = createEffect(() => this.actions$.pipe(
        ofType(CreateOrder),
        concatMap(action => this.OrdersServise.AddOrder(action.order).pipe(
            tap(neworder => {
                this.snackBar.open("ЗАМОВЛЕННЯ СТВОРЕНЕ", "OK",{verticalPosition:'top', duration: 2000,panelClass: ['snack-info'] } )
                
            }),
            map(() => OrderCreated()),
            catchError(err => { this.OnOrderError(err); return of(OrderCreatedErr())}   )
        )),
    ));


    constructor(private actions$: Actions,
        private OrdersServise: OrdersDatasourseService,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private store: Store<AppState>) {
    }


    OnOrderError(err)  {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minHeight = "25wh";
        dialogConfig.minWidth = "25wv";
        dialogConfig.width = "80wv";
        dialogConfig.panelClass = 'custom-modalbox';

        dialogConfig.data = { title: "Помилки при створенні замовлення. Повторити спробу?", content: err.comment }

        const DialogRef: MatDialogRef<YndialogComponent> = this.dialog.open(
            YndialogComponent,
            dialogConfig);


        return DialogRef.afterClosed().pipe(first()).subscribe(
             res => {
                
                if (res.answer) {
                    console.log('err',err);
                    this.store.dispatch(CreateOrder({order:err}))
                }
             }
        )
    }

}