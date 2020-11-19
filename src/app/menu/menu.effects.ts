import { MenuDataSourseService } from './menu-data-sourse.service';
import { loadAllMenu, allMenuLoaded } from './menu.actions';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
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
          return this.ds.GetAllMenu()
      }),
      tap(data=> console.log('fbdata',data)),
    
      map(data =>allMenuLoaded({goods:data[0], price:data[1]}))
  )
);





  constructor(private actions$: Actions,
              private store : Store<AppState>,
              private ds: MenuDataSourseService
              
              ) {}

}
