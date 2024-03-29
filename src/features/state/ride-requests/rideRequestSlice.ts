import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {RideRequest} from '../../types/RideRequest';

const sampleRide: RideRequest = {
  id: '1',
  userId: '1',
  driverId: null,
  pickupLocation: {
    latitude: 10.31995574882177,
    longitude: 123.90318896421478,
  },
  destination: {
    latitude: 10.296099600260172,
    longitude: 123.89138715420836,
  },
  status: 'pending',
  pickupTime: new Date(),
  timestamp: new Date(),
};

interface RideRequestState {
  rideRequests: RideRequest[];
}

const initialState: RideRequestState = {
  rideRequests: [sampleRide],
};

const slice = createSlice({
  name: 'rideRequest',
  initialState,
  reducers: {
    setRideRequests: (state, {payload}: PayloadAction<RideRequest[]>) => {
      state.rideRequests = payload;
    },
  },
});

export const {setRideRequests} = slice.actions;

export const selectAllRides = (state: RootState) => state.rideRequests.rideRequests;

export const {reducer: rideRequestsReducer} = slice;
