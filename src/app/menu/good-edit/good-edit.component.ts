import { IWEBGood } from './../../models/web.good';
import { IMobileGood, IMobilePriceData, IMobilePriceElement } from './../../models/mobile.good';
import { Component, Inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { selectGoodPrices } from '../menu.selectors';
import { debounceTime, map, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOrderGoodsRecordWithEntity } from 'src/app/models/order';


function simpleUniq<t>(s: t[]) : t[]  {
  const uniq : t[] = [];
  s.forEach(el => {
    if (uniq.find(uel => uel == el) == undefined) {
      uniq.push(el);
    };
  })
  return uniq;
  
}

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.scss']
})
export class GoodEditComponent implements OnInit {

  //defoultpicture: string = "https://firebasestorage.googleapis.com/v0/b/chilidelivery-42f84.appspot.com/o/webgoodpicures%2F5.jpg?alt=media&token=9c93dd85-301f-4a7c-ad72-24592aa5b8c5";
  priceData$: Observable<IMobilePriceData[]>;
  _priceData: IMobilePriceData[];

  sizeData$: Observable<number[]>;
  typesData$: Observable<number[]>;
  form: FormGroup;


  sizeNames = {
    0: "Без размера",
    1: "30",
    2: "40",
    3: "50"
  }


  typeNames = {
    0: "Без типа",
    1: "Обычная",
    2: "Фитнесс"
  }



  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<GoodEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: IMobileGood },
    public dialog: MatDialog) {


    this.form = new FormGroup({
      _quantity: new FormControl( {value: 1, disabled: true}, Validators.required ),
      _size: new FormControl(0, Validators.required),
      _type: new FormControl(0, Validators.required),
      _price: new FormControl(0, Validators.required),
      _summ: new FormControl(0, Validators.required),
      _priceElement: new FormControl(undefined, Validators.required)
    })

    this.priceData$ = this.store.pipe(
      select(selectGoodPrices, { mCategory: this.data.item.mCategory, mNumber: this.data.item.mNumber }),
      tap(data => this._priceData = data)
    );

    this.sizeData$ = this.priceData$.pipe(
      debounceTime(10),
      map(el => {
        const s = el.map(arrel => arrel.mData.mSize);
        return simpleUniq(s).sort();
      }),
      tap(u => {
        const first = u.length != 0 ? u[0] : 0;
        this.OnSizeSelect(first);
      })
    );
    this.typesData$ = this.priceData$.pipe(
      debounceTime(10),
      map(el => {
        const s = el.map(arrel => arrel.mData.mType)
        return simpleUniq(s).sort();

      }),
      tap(u => {
        const first = u.length != 0 ? u[0] : 0;
        this.OnTypeSelect(first);
      }));




  }

  ngOnInit(): void {

  }

  OnSizeSelect(val: number) {
    this._size = val;
    this._priceElement = this._priceData.find(el => el.mData.mSize == this._size && el.mData.mType == this._type)
    this._price = this._priceElement == undefined ? 0 : this._priceElement.price;
    this._summ = this._price * this._quantity;
  }

  OnTypeSelect(val: number) {
    this._type = val;
    this._priceElement = this._priceData.find(el => el.mData.mSize == this._size && el.mData.mType == this._type)
    this._price = this._priceElement == undefined ? 0 : this._priceElement.price;
    this._summ = this._price * this._quantity;
  }

  Onuantity(val: number) {
    const v = this._quantity+val;

    this._quantity = Math.max(0,v);
    this._summ = this._price * this._quantity;
  } 

  Cancel() {
    
    this.dialogRef.close({ answer: 'cancel' });
  }
  
  CompileGood() : IWEBGood {
    let good : IWEBGood = {
    id : this._priceElement.id,
    externalid : "",
    filials : this._priceElement.dirtyid,
    isDeleted : false,
    isFolder : false,
    isSelected : false,
    parentid : this.data.item.parentid,
    picture  : this.data.item.picture,
    price    : this._priceElement.price,
    name : ""};

    
    const sizeName = this._size == 0 ? "" : this.sizeNames[this._size];
    const typeName = this._type == 0 ? "" : this.typeNames[this._type];
    good.name = good.name.concat(this.data.item.mName," ",sizeName," ",typeName);
    return good;

  }
  
  Order() {
    let record : IOrderGoodsRecordWithEntity = {
      id : this._priceElement.id,
      quantity : this._quantity,
      comment : "",
      good : this.CompileGood()
  
    }
    this.dialogRef.close({ answer: 'order', record });
  }


  public get _size(): number {
    return this.form.get('_size').value
  }

  public set _size(v: number) {
    this.form.patchValue({ _size: v });
  }

  public get _summ(): number {
    return this.form.get('_summ').value
  }

  public set _summ(v: number) {
    this.form.patchValue({ _summ: v });
  }

  public get _price(): number {
    return this.form.get('_price').value
  }

  public set _price(v: number) {
    this.form.patchValue({ _price: v });
  }

  public get _quantity(): number {
    return this.form.get('_quantity').value
  }

  public set _quantity(v: number) {
    this.form.patchValue({ _quantity: v });
  }

  public get _type(): number {
    return this.form.get('_type').value
  }

  public set _type(v: number) {
    this.form.patchValue({ _type: v });
  }

  public get _priceElement(): IMobilePriceData {
    return this.form.get('_priceElement').value
  }

  public set _priceElement(v: IMobilePriceData) {
    this.form.patchValue({ _priceElement: v });
  }

}
