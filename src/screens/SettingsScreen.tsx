import { launchImageLibrary } from "react-native-image-picker";
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
import {useLoginMutation} from '../services/api';
import {selectIsLoggedIn, logout} from '../store/authSlice';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import type {TabScreenProps} from '../types/navigation';

export default function SettingsScreen({
  navigation,
}: TabScreenProps<'Settings'>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

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
          // You can now update the user's profile photo URL in the state
          console.log('selected image', response);
        }
      },
    );
  };


  return (
    <View>
      <VStack px="2" space="9">
        <Box alignItems="center" position="relative">
          {/* uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s', */}
          <Image
            source={
              user.profilePhotoUrl
                ? { uri: user.profilePhotoUrl }
                : {
                    uri: `https://ui-avatars.com/api/?name=${user.displayName}&background=random&size=200`,
                  }
            }
            borderRadius={100}
            alt="Profile photo"
            size="xl"
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
            {user.displayName}
          </Text>
        </Box>
        <VStack space="5">
          <FormControl>
            <FormControl.Label>Display Name</FormControl.Label>
            <Input
              onChangeText={value => setForm({...form, username: value})}
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
