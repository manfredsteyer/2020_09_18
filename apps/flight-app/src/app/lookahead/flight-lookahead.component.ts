import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { catchError, concatMap, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, map, mergeMap, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    control: FormControl;


    flights$: Observable<Flight[]>;
    loading$ = new BehaviorSubject<boolean>(false);


    online$: Observable<boolean>;

    private refreshClick$$ = new Subject<void>();
    refreshClick$ = this.refreshClick$$.asObservable();
    
    refresh() {
        this.refreshClick$$.next();
    }








    ngOnInit() {
        this.control = new FormControl();

        // http.post(); //.subscribe()
        // oo2 = o$.pipe(publish()) as ConnectableObservable<...>;
        // oo2.connect();

        // .pipe(multicast(x => new ReplaySubject()))

        this.online$ 
            = interval(2000).pipe( // 1, 2, 3, 4, ...
                    startWith(0),
                    map(_ => Math.random() < 0.5),
                    map(_ => true),
                    distinctUntilChanged(), // f, f, f, t, t, t, f, t
                    shareReplay(1), // Hot OBservable/ Multicast Observable
                                            // f        t        f  t
            );

        const input$ = this.control.valueChanges.pipe(debounceTime(300));

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            filter( ([_, online]) => online),
            map(([input, _]) => input),
            tap(v => this.loading$.next(true)),
            switchMap(name => this.load(name)),
            tap(v => this.loading$.next(false))
        );

        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       
        //                       tap(v => this.loading = true),
        //                       switchMap(name => this.load(name)),
        //                       tap(v => this.loading = false)
        //                     );
    }

    load(from: string)  {
        const url = "http://www.angular.at/api/flight";

        const params = new HttpParams()
                            .set('from', from);

        const headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers}).pipe(
            catchError(e => {
                console.debug('err', e);
                return of([]);
            }), 
        ) //.pipe(delay(7000))

    };


}
