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
  pickupTime: new Date().toISOString(),
  timestamp: new Date().toISOString(),
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
    declineRideRequest: (state, {payload}: PayloadAction<string>) => {
      const idx = state.rideRequests.findIndex(ride => ride.id === payload);
      state.rideRequests[idx].status = 'declined';
    },
    acceptRideRequest: (state, {payload}: PayloadAction<string>) => {
      const idx = state.rideRequests.findIndex(ride => ride.id === payload);
      state.rideRequests[idx].status = 'accepted';
    },
  },
});

export const {setRideRequests, declineRideRequest, acceptRideRequest} =
  slice.actions;

export const selectAllRides = (state: RootState) =>
  state.rideRequests.rideRequests;

export const {reducer: rideRequestsReducer} = slice;
