import {configureStore} from '@reduxjs/toolkit';
import {rideRequestsReducer} from './ride-requests/rideRequestSlice';

export const store = configureStore({
  devTools: __DEV__,
  reducer: {
    rideRequests: rideRequestsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
