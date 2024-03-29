import {useAppSelector} from '../../state/hooks';
import {selectAllRides} from '../../state/ride-requests/rideRequestSlice';

export const useRideRequests = () => {
  const rideRequests = useAppSelector(selectAllRides);

  const pendingRideRequests = rideRequests.filter(
    ({status}) => status === 'pending',
  );

  const getRideRequestById = (id: string) =>
    rideRequests.find(ride => ride.id === id);

  return {rideRequests, pendingRideRequests, getRideRequestById};
};
