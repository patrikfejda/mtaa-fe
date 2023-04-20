import React, { useState, useEffect } from 'react';
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

  const formatGPS = (dd, direction) => {
    const absDD = Math.abs(dd);
    const deg = Math.floor(absDD);
    const min = Math.floor((absDD - deg) * 60);
    const sec = Math.round((absDD - deg - min / 60) * 3600 * 1000) / 1000;
    let dir = "";
    if (direction == "lat") {
      dir = dd < 0 ? "S" : "N";
    }
    else if (direction == "lon") {
      dir = dd < 0 ? "W" : "E";
    }
    return `${deg}°${min}'${sec}"${dir}`;
  }


  const sendStatus = async () => {
    console.log("sendStatus");
    const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (permissionStatus === RESULTS.GRANTED) {
      console.log("permission granted");
    }
    else if (permissionStatus === RESULTS.DENIED) {
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


    await getLocation();
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(form);
    createStatus(form);

    console.log("https://www.google.com/maps/search/?api=1&query=" + form.latitude + "," + form.longitude);
    console.log(formatGPS(form.latitude, "lat") + ", " + formatGPS(form.longitude, "lon"))
  }

  const getLocation = async () => {
    console.log("gettting location");
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <View>
      <Button onPress={sendStatus}>
        <Text>SEND STATUS</Text>
      </Button>
    </View>
  );
}
