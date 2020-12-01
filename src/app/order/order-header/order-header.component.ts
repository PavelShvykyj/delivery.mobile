
import { tap } from 'rxjs/operators';
import { AppState } from './../../reducers/index';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { selectOrderHeader } from '../editorder.selectors';
import { IOrderHeader } from 'src/app/models/order';
import { UpdateOrderHeader } from '../editorder.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.scss']
})
export class OrderHeaderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  headersubs: Subscription;
  


  constructor(private store: Store<AppState>) {
    this.form = new FormGroup({
      addres: new FormControl("", Validators.required),
      phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      comment: new FormControl("")
    });

    

  }


  ngOnInit() {
    this.headersubs =  this.store.pipe(
      select(selectOrderHeader),
      tap(header=>{
        
          this.addres=header.addres;
        
        
          this.phone=header.phone;
        
        
          this.comment=header.comment;
        
      })).subscribe();
  }

  ngOnDestroy() {
    this.UpdateHeader()
    this.headersubs.unsubscribe();
  }

  UpdateHeader() {
    const header : IOrderHeader = {...this.form.value}
    this.store.dispatch(UpdateOrderHeader({
      header
    }))

  }



  ClearAdress() {
    this.addres="";
    this.UpdateHeader();
  }

  ClearPhone() {
    this.phone="";
    this.UpdateHeader();
  }

  ClearComment() {
    this.comment="";
    this.UpdateHeader();
  }

  getErrorMessage(controlname: string) {
    
    const message = this.form.hasError('minlength',controlname) ? 'Нехватает символов...' :
    this.form.hasError('maxlength',controlname) ? 'Лишние символы...' :
        '';
    return message;

  }

  get headervalid() {
    return this.form.valid
  }

  get addres() {
    return this.form.get('addres').value
  }

  get phone() {
    return this.form.get('phone').value
  }

  get phoneControl() {
    return this.form.get('phone');
  }


  get comment() {
    return this.form.get('comment').value
  }

  set addres(value: string) {
    this.form.get('addres').setValue(value);
    
  }

  set phone(value: string) {
    this.form.get('phone').setValue(value);
    
  }

  set comment(value: string) {
    this.form.get('comment').setValue(value);
    
  }
}
