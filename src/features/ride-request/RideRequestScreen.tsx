import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetail'>;

export const RideRequestScreen = (prop: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Ride Request Screen</Text>
    </View>
  );
};
