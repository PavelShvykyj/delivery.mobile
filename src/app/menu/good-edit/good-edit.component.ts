import { IMobileGood } from './../../models/mobile.good';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-good-edit',
  templateUrl: './good-edit.component.html',
  styleUrls: ['./good-edit.component.scss']
})
export class GoodEditComponent implements OnInit {

  defoultpicture : string = "https://firebasestorage.googleapis.com/v0/b/chilidelivery-42f84.appspot.com/o/webgoodpicures%2F5.jpg?alt=media&token=9c93dd85-301f-4a7c-ad72-24592aa5b8c5";  

  constructor(  
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<GoodEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {item: IMobileGood},
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Cancel() {
    this.dialogRef.close({answer: 'cancel'});
  }
  Order() {
    this.dialogRef.close({answer: 'order'});
  }


}
