
import { environment } from './../../../environments/environment';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IWEBGood } from 'src/app/models/web.good';
import { allMenuLoaded } from '../menu.actions';


export const menuFeatureKey = 'menu';






export interface MenuState extends EntityState<IWEBGood> {
  AllMenuLoaded:boolean
}

export const MenuAdapter = createEntityAdapter<IWEBGood>();
export const initialState = MenuAdapter.getInitialState({AllMenuLoaded:false});

function LoadAllMenu (state:MenuState,action):MenuState  {
   return MenuAdapter.addAll(action.streets,{...state,AllStreetsLoaded:true})
}

export const MenuReducer = createReducer(
  initialState,
  on(allMenuLoaded,(state,action)=> LoadAllMenu(state,action)),
  );


  export function menureducer(state: MenuState | undefined, action: Action) {
    return MenuReducer(state, action);
  }
  
export const {selectAll, selectEntities} = MenuAdapter.getSelectors();


export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];



