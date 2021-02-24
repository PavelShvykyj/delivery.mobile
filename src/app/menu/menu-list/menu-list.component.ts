import { IMobileGood } from './../../models/mobile.good';
import { isPlatformServer } from '@angular/common';

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
import { UpsertOrderRecord } from 'src/app/order/editorder.actions';

const batchSize = 5;

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport
  theEnd = false;
  isSkolledDownSubj = new BehaviorSubject(false);
  isSkolledDown$: Observable<boolean> = this.isSkolledDownSubj.asObservable();
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  currentFolder: string = "";
  parentFolder: string = "";

  currentFolder$: Observable<IMobileGood>;
  parentFolder$: Observable<IMobileGood>;


  defoultpicture: string = "https://firebasestorage.googleapis.com/v0/b/chilidelivery-42f84.appspot.com/o/webgoodpicures%2F5.jpg?alt=media&token=9c93dd85-301f-4a7c-ad72-24592aa5b8c5";
  Filter: string = "";

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>, @Inject(PLATFORM_ID) private plaformid) {
    if (!isPlatformServer(this.plaformid)) {
      this.Init();
    }
  }

  Init() {
    this.theEnd = false;
    this.offset = new BehaviorSubject(null);
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => { return { ...acc, ...batch }; }, {})
    );
    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  ngOnInit(): void {
    if (!isPlatformServer(this.plaformid)) {
      this.store.pipe(select(selectCurrentFolder)).subscribe(f => {
        if ((f.CurrentFolder != this.currentFolder) || (f.Filter != this.Filter)) {
          this.ScrollToStart();
          this.currentFolder = f.CurrentFolder;
          this.parentFolder = f.ParentFolder;
          this.currentFolder$ = this.store.pipe(select(selectGoodByID, { id: f.CurrentFolder }));
          this.parentFolder$ = this.store.pipe(select(selectGoodByID, { id: f.ParentFolder }));
          this.Filter = f.Filter;
          this.Init();
        }
      });
    }
  }

  OnElelementClick(item: IMobileGood) {
    if (item.isFolder) {
      this.store.dispatch(menuFolderSelected({ id: item.id, parentid: item.parentid }));
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
      if (res.answer == 'order') {
        this.store.dispatch(UpsertOrderRecord({ record: res.record }));
      }
    });
  }

  nextBatch(e, g) {
    this.isSkolledDownSubj.next(e >= 3)
    if (this.theEnd) {
      return
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end == total) {
      if (g == undefined) {
        this.offset.next("");
      }
      else {
        if (g.isFolder) {
          this.offset.next(g.id);
        } else {
          this.offset.next(g.mNumber);
        }
      }
    }
  }

  getBatch(lastSeen: string) {
    return this.store.pipe(select(selectGoodsBloc, { name: lastSeen, lenth: batchSize }),
      take(1),
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, cur) => {
          const id = cur.id;
          const data =
          {
            ...cur,
            id: id
          }
          return { ...acc, [id]: data };
        }, {});
      }),
    );
  }

  trackByIdx(i) {
    return i;
  }

  FolderUp(id: string = '') {
    if (id == this.currentFolder) {
      return;
    }

    if (id == '') {
      this.store.dispatch(menuFolderSelected({ id: "", parentid: "" }));
      return
    }

    // if (this.parentFolder == "" ) {
    //   if (this.currentFolder != "") {
    //     this.store.dispatch(menuFolderSelected({id:"",parentid:""}));
    //   }
    //   return;
    // }

    this.store.pipe(
      select(selectGoodByID, { id }),
      take(1),
      tap(el => this.store.dispatch(menuFolderSelected({ id: id, parentid: el.parentid })))
    ).subscribe();
  }

  ScrollToStart() {
    if (this.viewport != undefined) {
      this.viewport.scrollToIndex(0, 'smooth');
    }
  }
}
