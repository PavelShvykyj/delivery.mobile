export interface IBaseElement {
    id:string,
    externalid:string | undefined,
    isSelected:boolean,
    isDeleted:boolean
}

export interface IBaseGood extends IBaseElement {
    name:string,
    parentid:string | undefined,
    isFolder:boolean,
}