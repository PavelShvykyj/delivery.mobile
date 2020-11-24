import { IBaseGood } from './base.good';

export interface IMobileGood extends IMobileBitmapData  {
    id: string | undefined,
    parentid:string | undefined,
    isFolder:boolean,
    mName: string,
    picture?:string
}

export interface IMobilePriceElement {
    id:string,
    price:number,
    bitmap:number
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
    picture?:string
}



