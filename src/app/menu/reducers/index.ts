
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
import { allMenuLoaded, menuFolderSelected, menuMainFolderSelected } from '../menu.actions';
import { IMobileGood, IMobilePriceElement } from 'src/app/models/mobile.good';


export const menuFeatureKey = 'menu';

export interface IGoods extends EntityState<IMobileGood> {}
export interface IPrice extends EntityState<IMobilePriceElement> {}

export const GoodsAdapter = createEntityAdapter<IMobileGood>();
export const PriceAdapter = createEntityAdapter<IMobilePriceElement>();

export const GoodsinitialState = GoodsAdapter.getInitialState();
export const PriceinitialState = PriceAdapter.getInitialState();

export interface MenuState  {
  Goods:IGoods,
  Price:IPrice,
  AllMenuLoaded:boolean,
  CurrentFolder:string | undefined,
  ParentFolder:string | undefined,
}

export const initialState = { 
  AllMenuLoaded: false,
  CurrentFolder:"",
  ParentFolder:"",
  Goods:GoodsinitialState,
  Price:PriceinitialState
}




function LoadAllMenu (state:MenuState,action):MenuState  {
   return {...state, 
    AllMenuLoaded:true,
    Goods: GoodsAdapter.addMany(action.goods,state.Goods),
    Price: PriceAdapter.addMany(action.price,state.Price)}
}

function ChangeCurrentFolder (state:MenuState,action):MenuState  {
 
  return {...state,ParentFolder:action.parentid, CurrentFolder:action.id,};
}

export const MenuReducer = createReducer(
  initialState,
  on(allMenuLoaded,(state,action)=> LoadAllMenu(state,action)),
  on(menuMainFolderSelected,(state,action)=> ChangeCurrentFolder(state,action)),
  on(menuFolderSelected,(state,action)=> ChangeCurrentFolder(state,action))
  );


  export function menureducer(state: MenuState | undefined, action: Action) {
    return MenuReducer(state, action);
  }
  
export const {selectAll, selectEntities} = GoodsAdapter.getSelectors();
export const priceSelectAll = PriceAdapter.getSelectors().selectAll;
export const priceselectEntities = PriceAdapter.getSelectors().selectEntities;


export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];



