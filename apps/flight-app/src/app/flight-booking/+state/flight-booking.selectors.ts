import { createSelector } from '@ngrx/store';
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromFlightBooking from './flight-booking.reducer';

import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';

// export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
//   fromFlightBooking.flightBookingFeatureKey
// );


export const selectAllFlights = 
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights;

export const selectAllFlights2 = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (flights) => flights.filter(f => f.id % 2 === 0)
);

export const selectFilteredFlights = createSelector(
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].flights,
  (appState: FlightBookingAppStateSlice) => appState[flightBookingFeatureKey].negativeList,
  (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);
