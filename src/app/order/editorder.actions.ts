import { IOrderGoodsRecordWithEntity } from './../models/order';
import { IOrder, IOrderGoodsRecord, IOrderHeader, IOrderWithDirty } from '../models/order';
import { IONECGood } from '../models/onec.good';
import { IWEBGood, IWEBGoodWithFilials } from '../models/web.good';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const UpdateOrderHeader    = createAction("[EDIT ORDER COMPONENT] Update order in memoty",props<{header:IOrderHeader}>());
export const UpsertOrderRecord    = createAction("[MENU LIST COMPONENT] Update order goods in memoty",props<{record:IOrderGoodsRecordWithEntity}>());
export const DeleteOrderRecord    = createAction("[EDIT ORDER COMPONENT] Delete order goods record in memoty",props<{recordid: string}>());
export const CreateOrder    = createAction("[EDIT ORDER COMPONENT] Create new orders",props<{order: IOrderWithDirty}>());
export const OrderCreated   = createAction("[EDIT ORDER EFFECT] Order are created");
export const OrderCreatedErr   = createAction("[EDIT ORDER EFFECT] Order are not created");

