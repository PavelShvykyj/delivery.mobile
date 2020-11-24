import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromMenu from './reducers';
import { menureducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './menu.effects';
import { MenuDataSourseService } from './menu-data-sourse.service';
import { MenuResolver } from './menu.resolver';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MaterialsModule } from '../materials/materials.module';
import { GoodEditComponent } from './good-edit/good-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MenuListComponent, GoodEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialsModule,
    StoreModule.forFeature(fromMenu.menuFeatureKey, menureducer, { metaReducers: fromMenu.metaReducers }),
    EffectsModule.forFeature([MenuEffects])
  ],
  providers: [MenuDataSourseService,MenuResolver]
})
export class MenuModule { }
