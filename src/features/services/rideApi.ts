import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RideRequest} from '../types/RideRequest';

type GetAllRidesResponse = RideRequest[];

export const apiSlice = createApi({
  reducerPath: 'rideRequests',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1337'}),
  endpoints: builder => ({
    getRides: builder.query<GetAllRidesResponse, string>({
      query: () => '/rides',
    }),
    updateRide: builder.mutation({
      query: ride => ({
        url: `/rides/${ride.id}`,
        method: 'PATCH',
        body: ride,
        invalidatesTags: ['Rides'],
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetRidesQuery, useUpdateRideMutation} = apiSlice;
