import { isPlatformServer } from '@angular/common';
import { IWEBGood } from 'src/app/models/web.good';
import { map, mergeMap, scan, tap, throttleTime, concatMap, take, share } from 'rxjs/operators';

import { Component, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling' 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectCurrentFolder, selectGoodsBloc } from '../menu.selectors';
import { off } from 'process';
import { menuFolderSelected } from '../menu.actions';

const batchSize = 20;

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport : CdkVirtualScrollViewport 
  theEnd = false;
  offset = new BehaviorSubject(null);
  infinite : Observable<any[]>;
  currentFolder : string = "";
  

  constructor(private db : AngularFirestore,private store: Store<AppState>, @Inject(PLATFORM_ID) private plaformid) {
    this.Init();
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
    if (!isPlatformServer(this.plaformid)) {
      this.store.pipe(select(selectCurrentFolder)).subscribe(f=>{
      
        this.currentFolder = f;
        this.Init();
      })
    } 
  }

  OnElelementClick(item: IWEBGood) {
    
    if (item.isFolder) {
      this.store.dispatch(menuFolderSelected({id:item.id}));  
    }
  }

  nextBatch(e, g) {
    console.log('offset', g);
    if(this.theEnd) {
      return
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    
    if(end == total) {
      if (g == null || g == undefined) {
        this.offset.next(null);  
      } else {
        this.offset.next(g.mName);
      }
      
    }
  }

  getBatch(lastSeen: string) {
   

    return this.store.pipe(select(selectGoodsBloc,{name:lastSeen,lenth:batchSize}));
        

    // return this.db.collection('web.goods', ref => ref
    //     .where("parentid","==",this.currentFolder)
    //     .orderBy('name')
    //     .startAfter(lastSeen)
    //     .limit(batchSize))
    //       .snapshotChanges().pipe(
    //         tap(arr => ( arr.length ? null : (this.theEnd = true) )),
    //         map(arr => {return arr.filter(el=> !(el.payload.doc.data() as IWEBGood).isDeleted). reduce((acc,cur) => {
              
    //           const id = cur.payload.doc.id;
    //           const data = 
    //           {
    //             ...(cur.payload.doc.data() as object),
                
    //             id: id
    //           }
    //           return {...acc, [id]:data };},{}); }),
    //           take(1),
              
    //           share()
    //       );
  } 

  trackByIdx(i) {
    return i;
  }


}
