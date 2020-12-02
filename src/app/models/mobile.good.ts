import { IBaseGood } from './base.good';

export interface IMobileGood extends IMobileBitmapData  {
    id: string ,
    parentid:string,
    isFolder:boolean,
    mName: string,
    mDescription?:string,
    picture?:string
}

export interface IMobilePriceElement {
    id:string,
    price:number,
    bitmap:number,
    dirtyid:string[]
}

export interface IMobilePriceData extends IMobilePriceElement {
    mData : IMobileBitmapData
}

export interface IMobileBitmapData {
    mCategory?:number,
    mType?:number,
    mNumber?:number,
    mSize?:number
}

export interface IMobileData extends IMobileBitmapData {
    id:string,
    parentid:string | undefined,
    isFolder:boolean,
    price:number
    bitmap?:number
    mName?:string,
    mDescription?:string,
    picture?:string
}



