import * as React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export const HomeScreen = () => {
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
