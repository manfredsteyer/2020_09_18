import { Flight } from '@flight-workspace/flight-lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { mutableOn } from 'ngrx-etc';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppStateSlice {
  [flightBookingFeatureKey]: FlightBookingState
}

export interface FlightBookingState {
  flights: Flight[];
  basket: object;
  stats: object;
  negativeList: number[];
}

export const initialState: FlightBookingState = {
  flights: [],
  basket: {},
  stats: {},
  negativeList: [4],
};


export const reducer = createReducer(
  initialState,

  on(FlightBookingActions.flightsLoaded, (state, action) => {
    const flights = action.flights;
    return { ...state, flights }
  }),
  mutableOn(FlightBookingActions.updateFlight, (state, action) => {
    const flight = action.flight;
    const flights = state.flights;
    state.flights = flights.map(f => f.id === flight.id ? flight : f);
  }),
  on(FlightBookingActions.loadFlights, (state, action) => {
    const flights = [];
    return { ...state, flights, /* loading: true */ }
  }),


);

