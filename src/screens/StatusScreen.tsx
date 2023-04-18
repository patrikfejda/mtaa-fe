import React, { useState } from 'react';
import { View, Text, Button } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default function StatusScreen() {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      } else if (permissionStatus === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionRequest === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation(position);
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        } else {
          console.log('Permission denied', 'You need to grant access to location to use this feature.');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Location: {location ? `${location.coords.latitude}, ${location.coords.longitude}` : 'unknown'}</Text>
      <Button onPress={getLocation}>
        <Text>Get Location</Text>
      </Button>
    </View>
  );
}
