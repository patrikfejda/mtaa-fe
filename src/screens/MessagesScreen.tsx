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

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>

        {/* Message */}
        <Box>
          <HStack alignItems="flex-end" mb={3}>
            <Box alignItems="center">
              <Image
                source={{
                  uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
                }}
                borderRadius={100}
                alt="Alternate Text"
                size="xs"
                mr={2}
                />
            </Box>
            <VStack>
              <Text style={styles.senderName}>Patrik Fejda</Text>
              <Box
                py={2}
                px={4}
                borderRadius={10}
                bgColor="gray.700"
                alignSelf="flex-end"
                >
                <Text fontSize="md">Mam taky super business pre teba. Mozes robit z domu a si sam sebe panom.</Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message"
        />
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
  messageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  messageBubble: {
    maxWidth: '80%',
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
