import { IMobileGood } from './models/mobile.good';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild, Inject, PLATFORM_ID, OnInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppState } from './reducers';
import { selectTopFolders } from './menu/menu.selectors';
import { menuMainFolderSelected, loadAllMenu, changeFilerName } from './menu/menu.actions';
import { MatDrawer } from '@angular/material/sidenav';
import { isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { SelectOrderquantity } from './order/editorder.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'delivery-mobile';
  NameFilterValue = "";
  searchMode = false;

  @ViewChild('drawer')
  nav : MatDrawer 

  @ViewChild('search') searchElement: ElementRef;

  isHandset:boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    tap(result => this.isHandset=result.matches),
    map(result => result.matches),
    shareReplay()
  );

  orderLenth$ : Observable<number>;

  meinelements$: Observable<IMobileGood[]> = of([]);
  topicons = {
    1: 'pizza-slice',
    2: 'fish',
    3: 'bread-slice',
    4: 'glass-martini',

  }



constructor(private breakpointObserver: BreakpointObserver,
  private router : Router,
  private store: Store<AppState>, @Inject(PLATFORM_ID) private plaformid) {
    if ( !isPlatformServer(plaformid) ) {
      this.store.dispatch(loadAllMenu());
      this.meinelements$ = this.store.pipe(select(selectTopFolders));
      }
      this.orderLenth$ = this.store.pipe(select(SelectOrderquantity))
  }

  OnFilterChange() {
    let reg = "";
    if (this.NameFilterValue != "") {
      reg = ".*"+this.NameFilterValue.trim().toUpperCase().replace(/\s+/g, ".*")+".*" 
    } 
    
    this.store.dispatch(changeFilerName({filter:reg}));
    if (!this.router.isActive("Menu",true)) {
      this.router.navigateByUrl("Menu");
    } 
  }

  SearchMode() {
    this.searchMode = !this.searchMode;
    if (this.searchMode) {
      setTimeout(()=>{ 
        this.searchElement.nativeElement.focus();
      },10);  
    }
  }

  ClearFilter() {
    if(this.NameFilterValue != "") {
      this.store.dispatch(changeFilerName({filter:""}));
    }
    this.NameFilterValue = "";
  }

  GoToOrder() {
    if (this.isHandset) {
      this.nav.toggle();  
    }
    if (!this.router.isActive("Order",true)) {
      this.router.navigateByUrl("Order");
    } 
  }


  SetTopFolder(top:IMobileGood[],category:number) {
    const folder =  top.find(el=> el.mCategory == category);
    const newid : string  = folder != undefined ? folder.id : "";
    this.OnMenuItemClick(newid,false);
  }

  OnMenuItemClick(id,togglenav: boolean=true) {
    this.store.dispatch(menuMainFolderSelected({id:id,parentid:""}));
    
    if (this.isHandset && togglenav) {
      this.nav.toggle();  
    }
    
    if (!this.router.isActive("Menu",true)) {
      this.router.navigateByUrl("Menu");
    } 
  }

}
