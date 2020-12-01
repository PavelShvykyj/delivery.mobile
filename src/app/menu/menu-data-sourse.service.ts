import { IMobilePriceElement } from './../models/mobile.good';
import { from, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { IMobileGood } from '../models/mobile.good';
import { FbService } from '../fb.service';

@Injectable({
  providedIn: 'root'
})
export class MenuDataSourseService {

  constructor(private db : FbService) { }

  GetAllMenu() : Observable<any[]> {

   const database =  this.db._fdb.database();  
   let tasks = []; 
   let GoodsTask : Promise<IMobileGood[]> = database.ref('goods').orderByChild('mName').once('value').then(v=> 
      {
        let data: IMobileGood[] = v.val();
        let index : number = 0;
        return data.map(el => {index = index+1; return {...el, id: el.id == "" ? index.toString() : el.id }});
      });

   tasks.push(GoodsTask);   
   let PriceTask : Promise<IMobilePriceElement[]> = database.ref('price').once('value').then(v=> 
    {
      let data: IMobilePriceElement[] = v.val();
      
      return data;
    });   
    tasks.push(PriceTask);
   


   return from(Promise.all(tasks)); 


    // const webgoods$ = from(this.db.firestore.collection('web.goods').where("parentid","==","").where("isDeleted","==",false).get())
    // .pipe(map(res => {
    //   return res.docs.map(element => {
    //     return {
    //       ...(element.data() as object),
    //       isSelected: false,
    //       id: element.id,
    //       price: element.data().price==undefined ? 0 : element.data().price==undefined
    //     }
    //   }) as IWEBGood[];
    // }), take(1), share());



    // return webgoods$;
  }


}
