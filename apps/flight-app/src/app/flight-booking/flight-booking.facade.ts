import { Injectable } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { flightsLoaded, loadFlights } from './+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './+state/flight-booking.reducer';
import { selectFilteredFlights } from './+state/flight-booking.selectors';

// -- 4 --
@Injectable({providedIn: 'root'})
export class FlightBookingFacade {

    readonly flights$: Observable<Flight[]> = this.store.select(selectFilteredFlights);

    constructor(
        private store: Store<FlightBookingAppStateSlice>) { }
    
    search(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({from, to, urgent}));
    }
}


// -- 3 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$: Observable<Flight[]> = this.store.select(selectFilteredFlights);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {

//         this.flightService.find(from, to, urgent).subscribe(
//             flights => this.store.dispatch(flightsLoaded({flights})),
//             err => console.error('err', err)
//         );

//     }

// }

// -- 2 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     readonly flights$: Observable<Flight[]> = this.store.select(s => s[flightBookingFeatureKey].flights);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {

//         this.flightService.find(from, to, urgent).subscribe(
//             flights => this.store.dispatch(flightsLoaded({flights})),
//             err => console.error('err', err)
//         );

//     }

// }

// -- 1 --
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {

//     private flights$$ = new BehaviorSubject<Flight[]>([]);
//     readonly flights$: Observable<Flight[]> = this.flights$$.asObservable();

//     constructor(private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {

//         this.flightService.find(from, to, urgent).subscribe(
//             flights => this.flights$$.next(flights),
//             err => console.error('err', err)
//         );

//     }

// }