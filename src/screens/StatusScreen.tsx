import React, { useState } from 'react';
import { View, Text, Button } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request } from 'react-native-permissions';

export default function StatusScreen() {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);
      if (permissionStatus === 'granted') {
        console.log("granted");
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
        console.log("not granted");
        const permissionRequest = await request(PERMISSIONS.ANDROID.LOCATION_WHEN_IN_USE);
        console.log("stop");
        console.log(permissionRequest);
        if (permissionRequest === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              setLocation(position);
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
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
