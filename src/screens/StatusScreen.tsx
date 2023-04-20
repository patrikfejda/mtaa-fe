import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'native-base';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS, openSettings } from 'react-native-permissions';
import {useStatusMutation} from '../services/api';
import {
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppAvatarItem from '../components/AppAvatarItem';
import type {TabScreenProps} from '../types/navigation';


export default function StatusScreen() {
  const [createStatus, {isLoading}] = useStatusMutation();

  const [form, setForm] = useState({
    longitude: "0",
    latitude: "0",
    text: 'No status is set!',
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
    <View px="2">
      <HStack alignItems="flex-end">
        <FormControl flex="1">
          <FormControl.Label>How are you feeling?</FormControl.Label>
          <Input
            // borderRightRadius is not working due to a NativeBase bug
            borderTopRightRadius="none"
            borderBottomRightRadius="none"
            placeholder="Type your feeling here"
            size="md"
            variant="filled"
            onChangeText={value => setForm({...form, text: value})}
          />
        </FormControl>
        <IconButton
          icon={<Icon as={MaterialIcons} color="text.50" name="send" />}
          onPress={sendStatus}
          borderLeftRadius="none"
          variant="solid"
        />
      </HStack>

      <Text color="text.400" fontWeight="medium" pt="6" pb="1">
        Status wall
      </Text>

      {/* Example use */}
      <AppAvatarItem
        isHighlighted={true}
        user={{
          id: 1,
          username: 'username000',
          email: 'whatever',
          displayName: 'John Doe',
        }}
        date="2023-04-19T20:20:30.400+02:30"
        title="John Doe"
        titleGrayedOut="Me"
        subtitle="Good!"
      />
    {/* <Button onPress={sendStatus}>
        <Text>SEND STATUS</Text>
    </Button> */}
    </View>
  );
}
