import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import MapView, {MapMarker, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {RootStackParamList} from '../navigation/RootStack';
import {useAppDispatch} from '../state/hooks';
import {
  acceptRideRequest,
  declineRideRequest,
} from '../state/ride-requests/rideRequestSlice';
import {useRideRequests} from './hooks/useRideRequests';

const {EXPO_PUBLIC_GOOGLE_MAPS_APIKEY} = process.env;

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetail'>;

export const RideRequestScreen = (prop: Props) => {
  const dispatch = useAppDispatch();
  const {getRideRequestById} = useRideRequests();

  const {rideId} = prop.route.params;
  const rideRequest = getRideRequestById(rideId);

  const mapRef = React.useRef<MapView | null>(null);
  const pickupRef = React.useRef<MapMarker | null>(null);
  const destinationRef = React.useRef<MapMarker | null>(null);

  const onAcceptButtonPress = () => {
    dispatch(acceptRideRequest(rideId));
  };

  const onDeclineButtonPress = () => {
    dispatch(declineRideRequest(rideId));
  };

  if (!rideRequest) {
    return <Text>{`Failed to load ride details with id: ${rideId}`}</Text>;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Ride Details</Text>
      <Text>Status: {rideRequest.status}</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        onMapReady={() => {
          mapRef.current?.fitToCoordinates(
            [rideRequest.pickupLocation, rideRequest.destination],
            {edgePadding: {top: 100, bottom: 100, right: 0, left: 0}},
          );
          setTimeout(() => pickupRef.current?.showCallout(), 500);
        }}
        showsUserLocation
        loadingEnabled
        zoomEnabled={true}
        zoomTapEnabled={true}
        maxZoomLevel={60}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: rideRequest.pickupLocation.latitude,
          longitude: rideRequest.pickupLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          ref={pickupRef}
          title="Pickup"
          coordinate={rideRequest.pickupLocation}
        />
        <Marker
          title="Destination"
          ref={destinationRef}
          coordinate={rideRequest.destination}
        />

        {EXPO_PUBLIC_GOOGLE_MAPS_APIKEY && (
          <MapViewDirections
            origin={rideRequest.pickupLocation}
            destination={rideRequest.destination}
            apikey={EXPO_PUBLIC_GOOGLE_MAPS_APIKEY}
          />
        )}
      </MapView>

      <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
        <Button onPress={onAcceptButtonPress} title="ACCEPT" color={'blue'} />
        <Button onPress={onDeclineButtonPress} title="DECLINE" color={'red'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '70%',
  },
});
