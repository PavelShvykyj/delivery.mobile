import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { areAllMenuLoaded } from './menu.selectors';
import { loadAllMenu } from './menu.actions';

@Injectable()
export class MenuResolver implements Resolve<any> {

    loading = false;
    webloading = false;
    constructor(private store: Store<AppState>) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {



        let WebChain$ = this.store.pipe(
            select(areAllMenuLoaded), 
            tap(StreetssLoaded => {
                
                if (!this.webloading && !StreetssLoaded) {
                    this.webloading = true;
                    this.store.dispatch(loadAllMenu());
                }
            }),
            filter(StreetssLoaded => StreetssLoaded),
            first(),
            finalize(() => {console.log("finalize"); return this.webloading = false})
        );
        
        return WebChain$;          


    }



}