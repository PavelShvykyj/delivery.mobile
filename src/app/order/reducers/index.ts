
import {  IOrderGoodsRecordWithEntity } from './../../models/order';

import {
  MetaReducer,
  createReducer,
  Action,
  on
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { EditOrderActions } from '../editorder.action.types';


export const editorderFeatureKey = 'editorder';


export interface OrderGoodssState extends EntityState<IOrderGoodsRecordWithEntity> {
 
}

export interface EditOrderState {
  addres:string,
  phone:string,
  creation:Date,
  filial:string,
  desk:string,
  comment:string,
  goods: OrderGoodssState
}

export const EditOrderGoodsAdapter = createEntityAdapter<IOrderGoodsRecordWithEntity>();

export const EditOrderInitialState = {
  addres:"",
  phone:"",
  creation: new Date(),
  filial:"",
  desk:"",
  comment:"",
  goods: EditOrderGoodsAdapter.getInitialState()
}



function UpsertOrderRecord(state: EditOrderState ,action) {
  let record : IOrderGoodsRecordWithEntity = action.record;
  if ((state.goods.ids as string[]).indexOf(record.id)  == -1) {
    return {...state,goods: EditOrderGoodsAdapter.upsertOne(action.record,state.goods) }  
  } 
  else {
    const findedrecord   = state.goods.entities[record.id];
    console.log('findedrecord',findedrecord);
    if (findedrecord.quantity+record.quantity > 0) {
      
      
      return {...state,goods: EditOrderGoodsAdapter.upsertOne({...record,quantity:findedrecord.quantity+record.quantity},state.goods) }  
    } 
    else {
      return {...state,goods: EditOrderGoodsAdapter.removeOne(action.record,state.goods) }  
    }
  }
}

function OnOrderCreatedErr(state,action) {
  console.log("REDUCER OnOrderCreatedErr")
  return state;
}

export const EditOrderReducer = createReducer(
  EditOrderInitialState,
  on(EditOrderActions.OrderCreated, (state,action)=> EditOrderInitialState),
  on(EditOrderActions.UpdateOrderHeader, (state,action)=> {return {...state, ...action.header}}),
  on(EditOrderActions.UpsertOrderRecord, (state,action)=> UpsertOrderRecord(state,action)),
  on(EditOrderActions.DeleteOrderRecord, (state,action)=> {return {...state,goods: EditOrderGoodsAdapter.removeOne(action.recordid,state.goods) } }),
  on(EditOrderActions.OrderCreatedErr, (state,action)=> OnOrderCreatedErr(state,action)),
  
 
  
);

export function editorderreducer(state: EditOrderState | undefined, action: Action) {
  return EditOrderReducer(state, action);
}

export const {selectAll, selectEntities} = EditOrderGoodsAdapter.getSelectors();

export const metaReducers: MetaReducer<EditOrderState>[] = !environment.production ? [] : [];
