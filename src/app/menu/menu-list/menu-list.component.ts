import { map, mergeMap, scan, tap, throttleTime } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling' 
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor(private db : AngularFirestore) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n=> this.getBatch(n)),
      scan((acc,batch)=> {return {...acc, ...batch};},{})
    );

    this.infinite = batchMap.pipe(map(v=> Object.values(v)));

   }

  ngOnInit(): void {
    
  }

  nextBatch(e, offset) {
    console.log('nextBatch offset',offset);
    if(this.theEnd) {
      console.log('THE END');
      return
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log('end,total,offset',end,total,offset.name)


    if(end == total) {
      this.offset.next(offset.name);
    }

    
  }

  getBatch(lastSeen: string) {
    return this.db.collection('web.goods', ref => ref
    .orderBy('name')
    .startAfter(lastSeen)
    .limit(batchSize))
      .snapshotChanges().pipe(
        tap(arr => ( arr.length ? null : (this.theEnd = true) )),
        map(arr => {return arr.reduce((acc,cur) => {
          const id = cur.payload.doc.id;
          const data = cur.payload.doc.data();
          return {...acc, [id]:data };},{}); })
      )
  } 

  trackByIdx(i) {
    return i;
  }


}
