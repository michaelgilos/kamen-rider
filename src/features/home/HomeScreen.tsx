import * as Location from 'expo-location';
import {LocationAccuracy, LocationObject} from 'expo-location';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useGetAllRideRequests} from '../ride-request/hooks/useGetAllRideRequests';
import {RideRequest} from '../types/RideRequest';

const RideRequestMarkers = ({data = []}: {data: RideRequest[]}) => (
  <>
    {data.map(({id, status, pickupLocation}) => (
      <Marker
        key={id}
        coordinate={{
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
        }}
        anchor={{x: 0.5, y: 0.5}}
        stopPropagation={true}
        tracksViewChanges={false}
        title={status}
      />
    ))}
  </>
);

export const HomeScreen = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);

  const rideRequests = useGetAllRideRequests();

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.Balanced,
        timeInterval: 100,
      });
      setLocation(location);
    })();
  }, []);

  if (!location) {
    return <Text>Failed to load user location</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        loadingEnabled
        zoomEnabled={true}
        zoomTapEnabled={true}
        maxZoomLevel={60}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <RideRequestMarkers data={rideRequests} />
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
});
