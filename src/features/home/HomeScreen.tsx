import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {LocationAccuracy, LocationObject} from 'expo-location';
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

  const rideMarkers: RideRequest[] = [
    {
      id: '1',
      userId: '1',
      driverId: null,
      pickupLocation: {
        latitude: 10.31995574882177,
        longitude: 123.90318896421478,
      },
      destination: {
        latitude: 10.296099600260172,
        longitude: 123.89138715420836,
      },
      status: 'pending',
      pickupTime: new Date(),
      timestamp: new Date(),
    },
  ];

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
        <RideRequestMarkers data={rideMarkers} />
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
