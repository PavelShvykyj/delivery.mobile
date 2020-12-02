import { EditOrderState } from './reducers/index';
import * as fromEditOrder from './reducers/index';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';

/// ОБЩИЕ 

export const selectEditOrderState = createFeatureSelector<EditOrderState>(fromEditOrder.editorderFeatureKey);

export const GoodsState = createSelector(
    selectEditOrderState,
    state => state.goods
);

export const selectAllOrderGoods = createSelector(
    GoodsState,
    fromEditOrder.selectAll // встроеный в адаптер селектор мы его експортировали в файле reducers/index 
)

export const SelectOrderquantity = createSelector(
    selectAllOrderGoods,
    goods => {let quantity = 0; goods.forEach(el=> {quantity = quantity + el.quantity}); console.log('lenth',quantity); return quantity}
)


export const selectOrderHeader = createSelector(
    selectEditOrderState,
    state => {
        return {
            addres: state.addres,
            phone: state.phone,
            comment: state.comment
        }
    }
)

export const EditingOrder = createSelector(
    selectEditOrderState,
    selectAllOrderGoods,
    (state,goods) => {return  {...state, goods:goods}}
);



