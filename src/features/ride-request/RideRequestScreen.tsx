import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootStackParamList} from '../navigation/RootStack';
import {useRideRequests} from './hooks/useRideRequests';
import MapViewDirections from 'react-native-maps-directions';

const {EXPO_PUBLIC_GOOGLE_MAPS_APIKEY} = process.env;

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetail'>;

export const RideRequestScreen = (prop: Props) => {
  const {getRideRequestById} = useRideRequests();

  const {rideId} = prop.route.params;
  const rideRequest = getRideRequestById(rideId);

  if (!rideRequest) {
    return <Text>{`Failed to load ride details with id: ${rideId}`}</Text>;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Ride Details</Text>
      <Text>Status: {rideRequest.status}</Text>

      <MapView
        style={styles.map}
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
        <Marker coordinate={rideRequest.pickupLocation} />
        <Marker coordinate={rideRequest.destination} />

        {EXPO_PUBLIC_GOOGLE_MAPS_APIKEY && (
          <MapViewDirections
            origin={rideRequest.pickupLocation}
            destination={rideRequest.destination}
            apikey={EXPO_PUBLIC_GOOGLE_MAPS_APIKEY}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
