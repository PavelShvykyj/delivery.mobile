import { from, Observable, of } from 'rxjs';
import { IWEBGood } from '../models/web.good';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { share, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuDataSourseService {

  constructor(private db : AngularFirestore) { }

  GetAllMenu() : Observable<IWEBGood[]> {

    const webgoods$ = from(this.db.firestore.collection('web.goods').where("parentid","==","").where("isDeleted","==",false).get())
    .pipe(map(res => {
      return res.docs.map(element => {
        return {
          ...(element.data() as object),
          isSelected: false,
          id: element.id,
          price: element.data().price==undefined ? 0 : element.data().price==undefined
        }
      }) as IWEBGood[];
    }), take(1), share());



    return webgoods$;
  }


}
