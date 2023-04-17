import {
  Box,
  Button,
  FormControl,
  VStack,
  Icon,
  Image,
  Input,
  Text,
  HStack,
  View,
} from 'native-base';
import React from 'react';
import type {RootStackScreenProps} from '../types/navigation';

export default function MessagesScreen({}: RootStackScreenProps<'Messages'>) {
  return (
    <View>
      {/* <Text>TODO MESSAGES</Text> */}
      <HStack>
        <Box alignItems="center">
          <Image
            source={{
              uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
            }}
            borderRadius={100}
            alt="Alternate Text"
            size="xs"
            />
        </Box>
        <Box alignItems="center">
          <Text>dsadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaxx</Text>
        </Box>
      </HStack>
      <Input
        type="text"
        variant="filled"
        placeholder="Type a message..."
      />
      </View>
  );
}
