import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEditComponent } from '../order/order-edit/order-edit.component';
import { MaterialsModule } from '../materials/materials.module';
import { StoreModule  } from '@ngrx/store';
import * as fromEditorder from './reducers';
import { editorderreducer } from './reducers';
import { EditOrderEffects } from './editorder.effects';
import { OrderHeaderComponent } from './order-header/order-header.component';
import { OrderGoodsListComponent } from './order-goods-list/order-goods-list.component';
import { OrderToolbarComponent } from './order-toolbar/order-toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { OrderMiniComponent } from './order-mini/order-mini.component';





@NgModule({
  declarations: [OrderEditComponent, OrderHeaderComponent, OrderGoodsListComponent,  OrderToolbarComponent, OrderMiniComponent],
  exports:[OrderEditComponent, OrderMiniComponent],
  imports:[
    MaterialsModule,
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([EditOrderEffects]),
    StoreModule.forFeature(fromEditorder.editorderFeatureKey, editorderreducer, { metaReducers: fromEditorder.metaReducers }),
    NgxMaskModule.forChild(),
  ],
  providers:[]
})
export class OrderModule { }
