import { Text, View, Button } from 'native-base';
import React from 'react';
import type { TabScreenProps } from '../types/navigation';
import Geolocation from '@react-native-community/geolocation';

export default function StatusScreen({}: TabScreenProps<'Status'>) {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  return (
    <View>
      <Text fontSize="md">Ahoj, ako sa mas?</Text>
      <Button onPress={getLocation}>GET LOCATION</Button>
    </View>
  );
}
