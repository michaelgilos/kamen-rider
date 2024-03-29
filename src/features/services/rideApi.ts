import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {setRideRequests} from '../state/ride-requests/rideRequestSlice';
import {RideRequest} from '../types/RideRequest';

type GetAllRidesResponse = RideRequest[];

export const apiSlice = createApi({
  reducerPath: 'rideApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:1337'}),
  endpoints: builder => ({
    getRides: builder.query<GetAllRidesResponse, string>({
      // query: () => '/rides',
      queryFn: async (args, {dispatch}: BaseQueryApi) => {
        try {
          const response = await fetch('http://localhost:1337/rides');
          const data = (await response.json()) as RideRequest[];
          dispatch(setRideRequests(data));

          return {data};
        } catch (error) {
          return error;
        }
      },
    }),
    updateRide: builder.mutation({
      query: ride => ({
        url: `/rides/${ride.id}`,
        method: 'PATCH',
        body: ride,
        invalidatesTags: ['Ride'],
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetRidesQuery, useUpdateRideMutation} = apiSlice;
