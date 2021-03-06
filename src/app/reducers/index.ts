
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';



export interface AppState {
  router:RouterReducerState
}

export const reducers: ActionReducerMap<AppState> = {
  
  router: routerReducer

};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
