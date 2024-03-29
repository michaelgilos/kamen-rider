import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import {LocationAccuracy, LocationObject} from 'expo-location';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {RootStackParamList} from '../navigation/RootStack';
import {useRideRequests} from '../ride-request/hooks/useRideRequests';
import {RideRequest} from '../types/RideRequest';

const RideRequestMarkers = ({
  data = [],
  onSelect,
}: {
  data: RideRequest[];
  onSelect: (item: RideRequest) => void;
}) => (
  <>
    {data.map(ride => (
      <Marker
        key={ride.id}
        coordinate={{
          latitude: ride.pickupLocation.latitude,
          longitude: ride.pickupLocation.longitude,
        }}
        onPress={() => onSelect(ride)}
        anchor={{x: 0.5, y: 0.5}}
        stopPropagation={true}
        tracksViewChanges={false}
        title={ride.status}
      />
    ))}
  </>
);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  const {pendingRideRequests, isLoading} = useRideRequests();

  const [location, setLocation] = useState<LocationObject | undefined>();

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

  const handleSelectRide = (rideInfo: RideRequest) => {
    setTimeout(
      () => navigation.navigate('RideDetail', {rideId: rideInfo.id}),
      500,
    ); //add slight delay to complete animation
  };

  if (!location) {
    return <Text>Failed to load user location</Text>;
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
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
        <RideRequestMarkers
          data={pendingRideRequests}
          onSelect={handleSelectRide}
        />
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
