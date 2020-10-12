
import { IWEBGood } from '../models/web.good';
import { createAction,props } from '@ngrx/store';

 export const loadAllMenu = createAction("[MENU RESOLVER] Load streets");
 export const allMenuLoaded = createAction("[LOAD MENU EFFECT] Menu loaded",props<{goods: IWEBGood[]}>());
