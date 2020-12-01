import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { DialogstringinputComponent } from './dialogstringinput/dialogstringinput.component';
import { YndialogComponent } from './yndialog/yndialog.component';

@NgModule({
  declarations: [  DialogstringinputComponent, YndialogComponent],
  entryComponents:[DialogstringinputComponent,YndialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialsModule
  ],
  exports: [ DialogstringinputComponent, YndialogComponent]
})
export class BaseelementsModule { }
