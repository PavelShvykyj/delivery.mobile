import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IWEBGood } from '../models/web.good';
import { MenuState } from './reducers';
import * as fromMenu from './reducers/index';

export const selectMenuState = createFeatureSelector<MenuState>(fromMenu.menuFeatureKey);

export const selectAllMenu = createSelector(
    selectMenuState,
    fromMenu.selectAll 
)

export const areAllMenuLoaded = createSelector(
    selectMenuState,
    state => state.AllMenuLoaded);

export const selectCurrentFolder = createSelector(
        selectMenuState,
        state => state.CurrentFolder);
    

export const selectByName = createSelector(
    selectAllMenu,
    (state,props) => state.filter(el => el.name.toUpperCase().search(props.filter)!=-1) 
);
    
export const selectByParent = createSelector(
    selectAllMenu,
    (goods:IWEBGood[] , props) =>
    {
        if (props.onlyfolders) {
            goods = goods.filter(el=> el.isFolder)
        }
        goods = goods.filter(element => (element.parentid == props.parentid) || (props.parentid == undefined && element.parentid == ""));
        return goods;
    }
);


