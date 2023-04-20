import { launchImageLibrary } from "react-native-image-picker";
import RNFS from 'react-native-fs';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useChangeUserMutation} from '../services/api';
import {selectIsLoggedIn, logout} from '../store/authSlice';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import type {TabScreenProps} from '../types/navigation';
import AppAvatar from '../components/AppAvatar';
import {trimText} from '../utils/text';


export default function SettingsScreen({
  navigation,
}: TabScreenProps<'Settings'>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [changeUser, {isLoading}] = useChangeUserMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [form, setForm] = useState({
    displayName: user.displayName,
    profilePhoto: "",
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleImageChange = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const fileUri = response.assets[0].uri;
          const fileName = response.assets[0].fileName;
          const fileType = response.assets[0].type;
          const file = {
            uri: fileUri,
            name: fileName,
            type: fileType,
          };
          setForm({...form, profilePhoto: file});

          changeUser({...form, profilePhoto: file});
        }
      },
    );
  };


  return (
    <View>
      <VStack px="2" space="9">
        <Box alignItems="center" position="relative">
          <AppAvatar
            size="2xl"
            user={user}
          />

          <Button
            position="absolute"
            bottom={+10}
            right={+100}
            size="sm"
            onPress={handleImageChange}>
            <Icon as={MaterialIcons} name="edit" size="sm" color="white" />
          </Button>
          <Text fontSize="2xl" fontWeight="bold">
            {trimText(form.displayName, 25)}
          </Text>
        </Box>
        <VStack space="5">
          <FormControl>
            <FormControl.Label>Display Name</FormControl.Label>
            <Input
              onChangeText={value => {
                const updatedForm = {...form, displayName: value};
                setForm(updatedForm);
                changeUser(updatedForm);
              }}
  type="text"
  defaultValue={user.displayName}
  variant="filled"
/>
          </FormControl>
        </VStack>
        <VStack alignItems="center">
          <Button onPress={handleLogout} width="full">
            <HStack>
              <Icon as={MaterialIcons} color="text.50" name="logout" />
              <Text> Log Out</Text>
            </HStack>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}
