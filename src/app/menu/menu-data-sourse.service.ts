import { Observable, of } from 'rxjs';
import { IWEBGood } from '../models/web.good';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuDataSourseService {

  constructor() { }

  GetAllMenu() : Observable<IWEBGood[]> {

    return of([]);
  }


}
