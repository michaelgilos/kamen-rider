import {useAppSelector} from '../../state/hooks';
import {selectAllRides} from '../../state/ride-requests/rideRequestSlice';

export const useGetAllRideRequests = () => {
  const rideRequests = useAppSelector(selectAllRides);
  return rideRequests;
};
