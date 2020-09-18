import {Component, OnInit} from '@angular/core';

import {FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectAllFlights, selectFilteredFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.store.select(selectFilteredFlights)

  constructor(
    private store: Store<FlightBookingAppStateSlice>,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));
  }

  delay(): void {
    
    this.flights$.pipe(first()).subscribe(flights => {

      const flight = flights[0];
      const newFlight = { ...flight, date: new Date().toISOString()}
      this.store.dispatch(updateFlight({flight: newFlight}));

    });


  }

}
