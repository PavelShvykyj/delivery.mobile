import { MenuDataSourseService } from './menu-data-sourse.service';
import { loadAllMenu, allMenuLoaded } from './menu.actions';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../reducers';






@Injectable()
export class MenuEffects {

  loadMenu$ = createEffect(() =>
  this.actions$.pipe(
      ofType(loadAllMenu),
      concatMap(action => {
          return from(this.ds.GetAllMenu())
      }),
      
      concatMap(data => { 
          
          if(data.length==0 ) {
              return this.ds.GetAllMenu();
          } else {
              return of(data);
          }
            }),
      map(goods =>allMenuLoaded({goods:goods}))
  )
);





  constructor(private actions$: Actions,
              private store : Store<AppState>,
              private ds: MenuDataSourseService
              
              ) {}

}
