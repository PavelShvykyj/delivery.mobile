import { IMobileGood, IMobilePriceElement } from './../models/mobile.good';
import { createAction,props } from '@ngrx/store';

export const loadAllMenu = createAction("[MENU RESOLVER] Load main menu");
export const allMenuLoaded = createAction("[LOAD MENU EFFECT] Menu loaded",props<{goods: IMobileGood[], price : IMobilePriceElement}>());
export const menuMainFolderSelected = createAction("[APP COMPONENT]  Menu folder selected",props<{id: string , parentid:string }>());
export const menuFolderSelected = createAction("[MENU LIST COMPONENT]  Menu folder selected",props<{id: string , parentid:string }>());
export const changeFilerName = createAction("[APP COMPONENT]  Change filter by name",props<{filter: string }>());