import { isPlatformServer } from '@angular/common';
import { IWEBGood } from 'src/app/models/web.good';
import { map, mergeMap, scan, tap, throttleTime, concatMap, take, share } from 'rxjs/operators';
import { Component, ViewChild, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling' 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectCurrentFolder, selectGoodByID, selectGoodsBloc } from '../menu.selectors';
import { menuFolderSelected } from '../menu.actions';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GoodEditComponent } from '../good-edit/good-edit.component';

const batchSize = 5;

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport : CdkVirtualScrollViewport 
  theEnd = false;
  isSkolledDownSubj = new BehaviorSubject(false);
  isSkolledDown$ : Observable<boolean> = this.isSkolledDownSubj.asObservable();
  offset = new BehaviorSubject(null);
  infinite : Observable<any[]>;
  currentFolder : string = "";
  parentFolder : string = "";
  defoultpicture : string = "https://firebasestorage.googleapis.com/v0/b/chilidelivery-42f84.appspot.com/o/webgoodpicures%2F5.jpg?alt=media&token=9c93dd85-301f-4a7c-ad72-24592aa5b8c5";  


  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>, @Inject(PLATFORM_ID) private plaformid) {
    if ( !isPlatformServer(this.plaformid) ) {
    this.Init();
    }
   }

   Init() {
    this.theEnd = false;
    this.offset = new BehaviorSubject(null);
    
    const batchMap = this.offset.pipe(
      
      throttleTime(500),
      mergeMap(n=> this.getBatch(n)),
      scan((acc,batch)=> {return {...acc, ...batch};},{})
        
    );

    
    this.infinite = batchMap.pipe(map(v=> Object.values(v)));
   }

 
  ngOnInit(): void {
    if ( !isPlatformServer(this.plaformid) ) {  
      this.store.pipe(select(selectCurrentFolder)).subscribe(f=>{
        this.ScrollToStart();
        this.currentFolder = f.CurrentFolder;
        this.parentFolder = f.ParentFolder;
        this.Init();
    }) 
  }}

  OnElelementClick(item: IWEBGood) {
    if (item.isFolder) {
      this.store.dispatch(menuFolderSelected({id:item.id,parentid: item.parentid}));
      return 
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.maxHeight = "90vh";
    dialogConfig.maxWidth = "500px"
    dialogConfig.width = "90vw";
    dialogConfig.panelClass = 'custom-modalbox';
    dialogConfig.data = { item }
    const DialogRef: MatDialogRef<GoodEditComponent> = this.dialog.open(GoodEditComponent, dialogConfig);
    DialogRef.afterClosed().subscribe(res => {
      if (res.answer != 'save') {
        return;
      }});

      //this.store.dispatch(updateWebgood({ good: res.data }));
  }

  nextBatch(e, g) {

    this.isSkolledDownSubj.next(e>=3) 

    if(this.theEnd) {
      return
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    
    if(end == total) {
      if (g == undefined ) {
        this.offset.next("");
      }
      else {
        this.offset.next(g.mNumber);      
      }

      
    }
  }

  getBatch(lastSeen: string) {
   

    return this.store.pipe(select(selectGoodsBloc,{name:lastSeen,lenth:batchSize}),
                      take(1),
                      tap(arr => ( arr.length ? null : (this.theEnd = true) )),
                      map(arr => {
                        return arr.reduce((acc,cur) => {
                                
                      const id = cur.id;
                      const data = 
                      {
                      ...cur,
                      id: id
                      }
                      return {...acc, [id]:data };},{}); }),
                      );
  } 

  trackByIdx(i) {
    return i;
  }

  FolderUp() {
    
    if (this.parentFolder == "" ) {
      if (this.currentFolder != "") {
        this.store.dispatch(menuFolderSelected({id:"",parentid:""}));
      }
      return;
    }
    
    this.store.pipe(
      select(selectGoodByID,{id:this.parentFolder}),
      take(1),
      tap(el=> this.store.dispatch(menuFolderSelected({id:this.parentFolder,parentid:el.parentid})))
    ).subscribe();
  }

  ScrollToStart() {
    if (this.viewport != undefined) {
      this.viewport.scrollToIndex(0); 
    }
    
  }

}
