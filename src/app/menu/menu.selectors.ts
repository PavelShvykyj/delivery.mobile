import { createFeatureSelector, createSelector } from '@ngrx/store';
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

export const selectByName = createSelector(
    selectAllMenu,
    (state,props) => state.filter(el => el.name.toUpperCase().search(props.filter)!=-1) 
);
    



