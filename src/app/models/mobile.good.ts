import { IBaseGood } from './base.good';

export interface IMobileGood  {
    id: string | undefined,
    parentid:string | undefined,
    isFolder:boolean,
    mName: string,
    picture?:string,
    mCategory?:number,
    mNumber?:number
}

export interface IMobilePriceElement {
    id:string,
    price:number,
    bitmap:number
}

export interface IMobileData {
    id:string,
    parentid:string | undefined,
    isFolder:boolean,
    mCategory:number,
    mType:number,
    mNumber:number,
    mSize:number,
    price:number
    bitmap?:number
    mName?:string,
    picture?:string
}



