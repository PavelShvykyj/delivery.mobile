import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-messagedialog',
  templateUrl: './messagedialog.component.html',
  styleUrls: ['./messagedialog.component.scss']
})
export class MessagedialogComponent implements OnInit {

  title: string = "";
  content: string = "";
  subtitle: string = "";

  constructor( public dialogRef: MatDialogRef<MessagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {title: string, content:string, subtitle: string },
    public dialog: MatDialog) {
        this.title = this.data.title;
        this.subtitle = this.data.subtitle;
        this.content = this.data.content;
     }

  ngOnInit(): void {
  }

}
