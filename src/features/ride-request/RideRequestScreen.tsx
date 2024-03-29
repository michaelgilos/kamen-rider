import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../navigation/RootStack';
import {useRideRequests} from './hooks/useRideRequests';

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetail'>;

export const RideRequestScreen = (prop: Props) => {
  const {getRideRequestById} = useRideRequests();

  const rideRequest = getRideRequestById(prop.route.params.rideId);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Ride Details</Text>
    </View>
  );
};
