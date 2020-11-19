import { IMobileGood } from './../models/mobile.good';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './reducers';
import * as fromMenu from './reducers/index';
import { min } from 'rxjs/operators';

export const selectMenuState = createFeatureSelector<MenuState>(fromMenu.menuFeatureKey);

export const GoodsState = createSelector(
    selectMenuState,
    state => state.Goods);

export const PriceState = createSelector(
    selectMenuState,
    state => state.Price);
    

export const selectAllMenu = createSelector(
    GoodsState,
    fromMenu.selectAll 
)

export const selectAllFolders = createSelector(
    selectAllMenu,
    goods => {console.log('selectAllFolders',goods); return goods.filter(el => {return el.isFolder})} 
)

export const selectTopFolders = createSelector(
    selectAllFolders,
    goods =>  { return goods.filter(el => {return el.parentid == ""} )})


export const selectAllPrice = createSelector(
    PriceState,
    fromMenu.priceSelectAll 
)

export const areAllMenuLoaded = createSelector(
    selectMenuState,
    state => state.AllMenuLoaded);

export const selectCurrentFolder = createSelector(
        selectMenuState,
        state => state.CurrentFolder);
    
export const selectGoodsBloc = createSelector(
    selectAllMenu,
    selectCurrentFolder,
    (state,folder,props) => { 
        let goods : IMobileGood[] = state;
        goods = goods.filter(el => {return el.parentid==folder});
        console.log('goods',goods)
        let StartIndex = 0;
        if (props.name==null || props.name==undefined || props.name=="" ) {
            StartIndex = 0;
        } else {
            StartIndex = Math.min(goods.indexOf(goods.find(el => (el.mName == props.name)))+1,goods.length-1);
        }
        console.log('start, props.lenth, end',StartIndex,props.lenth ,Math.min(StartIndex+props.lenth, goods.length-1));
        goods = goods.slice(StartIndex,Math.min(StartIndex+props.lenth, goods.length-1));
        console.log('goods slise',goods);
        return goods
    }); 

        

export const selectByName = createSelector(
    selectAllMenu,
    (state,props) => state.filter(el => el.name.toUpperCase().search(props.filter)!=-1) 
);
    
export const selectByParent = createSelector(
    selectAllMenu,
    (goods:IMobileGood[] , props) =>
    {
        if (props.onlyfolders) {
            goods = goods.filter(el=> el.isFolder)
        }
        goods = goods.filter(element => (element.parentid == props.parentid) || (props.parentid == undefined && element.parentid == ""));
        return goods;
    }
);


