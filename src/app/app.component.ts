import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OperationServices } from './services/operation.service';
import { Observable, Subscription, map, catchError, of, distinct, mergeMap, debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {

  ofResult: any[] = [];
  filterResult: any[] = [];
  mergeResult: any[] = [];
  of$?: Subscription;
  fromEvent$?: Observable<any>;
  debounceTime$?: Observable<any>;
  merge$?: Subscription;
  combineLatest$?: Observable<any>;
  map$?: Observable<any>;
  retry$?: Observable<any>;
  timer$?: Observable<number>;
  error$?: Observable<any>;
  filter$?: Subscription;

  constructor(private readonly service: OperationServices) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.of$?.unsubscribe();
    this.filter$?.unsubscribe();
  }


  emitOf(): void {
    this.of$ = this.service.of().subscribe((res) => {
      if (this.ofResult.length < 3) {
        this.ofResult.push(res)
      }
    });
  }
  
  clearOf(): void {
    this.ofResult = [];
  }

  emitTimer(): void {
    this.timer$ = this.service.timer();
  }

  emitFromEvent(): void {
    this.fromEvent$ = this.service.fromEvent(document.getElementById('from-event'), 'keyup')
      .pipe(
        map((e: any) => e.target.value.toUpperCase())
      );
  }

  emitDebounceTime(): void {
    const event$ = this.service.fromEvent(document.getElementsByClassName('input-text'), 'keyup');
    this.debounceTime$ = event$.pipe(
      map((e: any) => e.target.value.toUpperCase()),
      debounceTime(2000)
    )
    this.debounceTime$.subscribe((result)=> console.log(result));
  }



  emitThrowError(): void {
    this.error$ = this.service.throwError()
      .pipe(catchError((error: Error) => of(error.message)))
  }

  emitFilter(): void {
    this.filter$ = this.service.filter().subscribe((result) => {
      if (!this.filterResult.includes(result)) {
        this.filterResult.push(result);
      }
    })
  }
  emitMap(): void {
    this.map$ = this.service.map();
  }
  emitCombineLatest(): void {
    this.combineLatest$ = this.service.combineLatest().pipe(mergeMap((result: Array<any>)=>{
      let maxAge = 0;
      result.forEach((item)=> maxAge+=item.age);
      return of(maxAge);
    }));
  }
  emitMerge(): void {
    this.merge$ = this.service.merge().subscribe((result)=>{
      console.log(result)
      this.mergeResult.push(result);
    })
  }

  emitRetry(): void {
    this.retry$ = this.service.retry();
    this.retry$.subscribe({
      next: (result)=>{
        console.log(result);
      },
      error: (error)=>{
        console.log(error);
        
      }
    })
  }
}
