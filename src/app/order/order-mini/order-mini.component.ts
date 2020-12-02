import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SelectOrderquantity } from '../editorder.selectors';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'order-mini',
  templateUrl: './order-mini.component.html',
  styleUrls: ['./order-mini.component.scss']
})
export class OrderMiniComponent implements OnInit {

  orderLenth$ : Observable<number>

  constructor(
    private router : Router, 
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.orderLenth$ = this.store.pipe(select(SelectOrderquantity))
  }

  GoTo(url:string) {
  
    if (!this.router.isActive(url,true)) {
      this.router.navigateByUrl(url);
    } 
  }  
  
 
}
