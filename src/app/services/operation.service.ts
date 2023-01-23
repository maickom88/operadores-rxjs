import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatest, concat, delay, filter, forkJoin, from, fromEvent, 
  map, merge, mergeMap, of, retry, throwError, timer, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationServices {
  constructor() { }

  of(): Observable<any>{
    return of({ name: 'Brian' }, [1, 2, 3], 120);
  }

  
  timer(): Observable<number>{
    return timer(1000, 3000);
  }
  
  fromEvent(element: any, typeEvent: any): Observable<any>{
    return fromEvent(element, typeEvent);
  }
  
  throwError(): Observable<any>{
    return throwError(()=>{
      return Error('Error from test');
    });
  }

  filter(): Observable<any>{
    return from([1,2,3,4,5,6,7]).pipe(filter((num)=> num % 2 == 0));
  }

  map(): Observable<any>{
    const source = of({ name: 'Joe', age: 30 },{ name: 'Even', age: 10 });
    return source.pipe(map((object) => object.name));
  }

  retry(): Observable<any>{
    const source = of({ name: 'Joe', age: 30 },{ name: 'Even', age: 10 });
    return source.pipe(mergeMap((object) =>{
      if(object.name == 'Even'){
        return this.throwError()
      }
      return of(object.name);
    }), retry(2))
  }
  
  combineLatest(): Observable<any>{
    const source1$ = of({ name: 'John', age: 13 }).pipe(delay(10000));
    const source2$ = of({ name: 'Pedro', age: 23 }).pipe(delay(1000));
    const source3$ = of({ name: 'Carl', age: 12 }).pipe(delay(1000));

    return combineLatest([source1$, source2$, source3$]);
  }

  merge(): Observable<any>{
    const source1$ = of({ name: 'John', age: 13 }).pipe(delay(10000));
    const source2$ = of({ name: 'Pedro', age: 23 }).pipe(delay(1000));
    const source3$ = of({ name: 'Carl', age: 12 }).pipe(delay(1000));

    return merge(source1$, source2$, source3$)
  }
}
