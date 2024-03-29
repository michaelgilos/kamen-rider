import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {RideRequest} from '../../types/RideRequest';

const DriverId = 'aXn1';

interface RideRequestState {
  rideRequests: RideRequest[];
}

const initialState: RideRequestState = {
  rideRequests: [],
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
      state.rideRequests[idx].driverId = DriverId;
    },
    updateRideRequestStatus: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        status:
          | 'pending'
          | 'accepted'
          | 'declined'
          | 'started'
          | 'picked-up'
          | 'dropped-off';
      }>,
    ) => {
      const idx = state.rideRequests.findIndex(ride => ride.id === payload.id);
      state.rideRequests[idx].status = payload.status;
    },
  },
});

export const {
  setRideRequests,
  declineRideRequest,
  acceptRideRequest,
  updateRideRequestStatus,
} = slice.actions;

export const selectAllRides = (state: RootState) =>
  state.rideRequest.rideRequests;

export const {reducer: rideRequestsReducer} = slice;
