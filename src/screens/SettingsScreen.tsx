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

  return (
    <View>
      <Text>This page is under construction</Text>

      <VStack px="2" space="9">
        <Box alignItems="center">
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
            }}
            borderRadius={100}
            alt="Alternate Text"
            size="xl"
          />
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
