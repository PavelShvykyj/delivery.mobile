import { IMobileBitmapData, IMobileGood, IMobilePriceElement } from './../models/mobile.good';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './reducers';
import * as fromMenu from './reducers/index';
import { min, filter, map } from 'rxjs/operators';


// export function MDataBitMap(el:IMobileData| IWEBGood) : number {
  
//     let result = 0;
//     result = result | ((el.mCategory & 0b1111) << 17); // 21-18  mCategory - 4bit - Category (non-0)
//     result = result | ((el.mNumber & 0b1111111111) << 7) // 17-8  mNumber - 10bit - num in Category
//     result = result | ((el.mType & 0b1111) << 3) // 7-4  mType - 4bit - type (non-0)
//     result = result | (el.mSize & 0b111)  // 3-1  mSize - 3bit - 50cm-3 40cm-2 30cm-1 non-0
//     //console.log('bit map',result, result.toString(2));
//     return result;
//   }



export function GetMobileBitmapData(bitmap:number) : IMobileBitmapData {

   const mCategory = (bitmap & 0b111100000000000000000) >> 17;
   const mNumber   = (bitmap & 0b000011111111110000000) >> 7;
   const mType     = (bitmap & 0b000000000000001111000) >> 3;
   const mSize     = (bitmap & 0b000000000000000000111) ;
   console.log({mCategory,mNumber,mType,mSize});

   return {mCategory,mNumber,mType,mSize};


} 

export function SortBynumber(el1:IMobileGood,el2:IMobileGood) {
    if (el1.mNumber>el2.mNumber) {
      return 1;  
    } 

    if (el1.mNumber==el2.mNumber) {
        return 0;  
    }

    if (el1.mNumber<el2.mNumber) {
        return -1;  
    }

}

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

export const selectGoodPrices = createSelector(
    selectAllPrice,
    (state,props) => {
        return state.map(el=> { return {...el, mData : GetMobileBitmapData(el.bitmap)}} )
                    .filter(el=> {return (el.mData.mCategory == props.mCategory) && (el.mData.mNumber == props.mNumber)});
    }
)


export const areAllMenuLoaded = createSelector(
    selectMenuState,
    state => state.AllMenuLoaded);

export const selectCurrentFolder = createSelector(
        selectMenuState,
        state => {return {CurrentFolder:state.CurrentFolder, ParentFolder: state.ParentFolder}});
    
export const selectGoodsBloc = createSelector(
    selectAllMenu,
    selectCurrentFolder,
    (state,folder,props) => { 
        let goods : IMobileGood[] = state;
        
        
        goods = goods.filter(el => {

        return el.parentid==folder.CurrentFolder});
        
        goods.sort((el1,el2)=> SortBynumber(el1,el2));

        let StartIndex = 0;
        if (props.name==null || props.name==undefined || props.name=="" ) {
            StartIndex = 0;
        } else {
            StartIndex = Math.min(goods.indexOf(goods.find(el => (el.mNumber == props.name)))+1,goods.length-1);
        }
        
        goods = goods.slice(StartIndex,Math.min(StartIndex+props.lenth, goods.length-1));
        
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


