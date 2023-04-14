import {Box, Button, FormControl, Input, Text, VStack, View, Image} from 'native-base';
import {HStack, Icon, IconButton, StatusBar, useToken, CheckIcon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {selectIsLoggedIn} from '../store/authSlice';
import {useAppSelector} from '../store/hooks';
import type {RootStackScreenProps} from '../types/navigation';
import React, {useState} from 'react';
import {useLoginMutation} from '../services/api';

export default function SettingsScreen({
  navigation,
}: RootStackScreenProps<'Settings'>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [login, {isLoading}] = useLoginMutation();

  return (
    <View>
      <Text>This page is under construction</Text>

      <VStack px="2" space="9">

        <Box alignItems="center">
          <Image source={{uri: "https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s"}}
            borderRadius={100} alt="Alternate Text" size="xl" />
          <Text fontSize="2xl" fontWeight="bold">
            Patrik Fejda
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
          <Button
            onPress={() => login(form)}
            isLoading={isLoading}
            width="full">
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
