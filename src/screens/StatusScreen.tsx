import React, { useState } from 'react';
import { View, Text, Button } from 'native-base';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS, openSettings } from 'react-native-permissions';
import {useStatusMutation} from '../services/api';


export default function StatusScreen() {
  const [createStatus, {isLoading}] = useStatusMutation();

  const [form, setForm] = useState({
    longitude: "0",
    latitude: "0",
    text: 'AHOJKY',
  });


  const sendStatus = async () => {
    console.log("sendStatus");
    await getLocation();
    console.log(form);
    createStatus(form);

    // geo

    console.log("https://www.google.com/maps/search/?api=1&query=" + form.latitude + "," + form.longitude);
  }

  const getLocation = async () => {
    try {
      const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionStatus === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setForm({...form, longitude: position.coords.longitude.toString(), latitude: position.coords.latitude.toString()});
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      } else if (permissionStatus === RESULTS.DENIED) {
        const permissionRequest = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (permissionRequest === RESULTS.GRANTED) {
          await Geolocation.getCurrentPosition(
            (position) => {
              setForm({...form, longitude: position.coords.longitude, latitude: position.coords.latitude})
            },
            (error) => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        } else {
          Alert.alert(
            'Permission denied',
            'You need to grant access to location to use this feature.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  openSettings().catch(() => console.warn('cannot open settings'));
                },
              },
            ]
            );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button onPress={sendStatus}>
        <Text>SEND STATUS</Text>
      </Button>
    </View>
  );
}
