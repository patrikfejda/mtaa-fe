import {
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  View,
} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppAvatarItem from '../components/AppAvatarItem';
import type {TabScreenProps} from '../types/navigation';

export default function StatusScreen({}: TabScreenProps<'Status'>) {
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
          />
        </FormControl>
        <IconButton
          icon={<Icon as={MaterialIcons} color="text.50" name="send" />}
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
    </View>
  );
}
