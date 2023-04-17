// import { StyleSheet, Text, TextInput, View } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  VStack,
  Icon,
  Image,
  Input,
  Text,
  HStack,
  View,
} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {RootStackScreenProps} from '../types/navigation';

// export default function MessagesScreen({}: RootStackScreenProps<'Messages'>) {
//   return (
//     <View>
//       {/* <Text>TODO MESSAGES</Text> */}
      // <HStack>
      //   <Box alignItems="center">
      //     <Image
      //       source={{
      //         uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
      //       }}
      //       borderRadius={100}
      //       alt="Alternate Text"
      //       size="xs"
      //       />
      //   </Box>
      //   <Box alignItems="center">
      //     <Text>dsadsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaxx</Text>
      //   </Box>
      // </HStack>
//       <Input
//         type="text"
//         variant="filled"
//         placeholder="Type a message..."
//       />
//       </View>
//   );
// }


const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>

        {/* Message 1 */}

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
            <Text>Ahoj, ako sa mas?</Text>
          </Box>
        </HStack>


        {/* Message 2 */}

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
            <Text>Dnes som ta nevidel vobec</Text>
          </Box>
        </HStack>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message"
        />
        {/* <IconButton
          icon={() => <MaterialIcons name="send" size={24} color="#6200EE" />}
        /> */}
        <IconButton
            icon={<Icon as={MaterialIcons} color="text.50" name="send" />}
            colorScheme="light"
            size="lg"
            p="0"
          />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
    color: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
