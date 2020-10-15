import { IWEBGood } from 'src/app/models/web.good';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from './reducers';
import { selectByParent } from './menu/menu.selectors';
import { menuMainFolderSelected, loadAllMenu } from './menu/menu.actions';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'delivery-mobile';

  @ViewChild('drawer')
  nav : MatDrawer 


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  meinements$: Observable<IWEBGood[]> = of([]);

constructor(private breakpointObserver: BreakpointObserver,
  private store: Store<AppState>) {
    this.store.dispatch(loadAllMenu());
    this.meinements$ = this.store.pipe(select(selectByParent, { onlyfolders: true, parentid: undefined }));
  }

  OnMenuItemClick(id) {
    this.store.dispatch(menuMainFolderSelected({id:id}));
    
    this.nav.toggle();
    
    

  }

}
