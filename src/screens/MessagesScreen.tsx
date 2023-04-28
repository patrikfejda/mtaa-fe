import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
                alignSelf="flex-end">
                <Text fontSize="md">Ahoj, ako sa mas.</Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

        {/* Your Message */}
        <Box alignSelf="flex-end">
          <HStack alignItems="flex-end" mb={3}>
            <VStack>
              <Box
                py={2}
                px={4}
                borderRadius={10}
                bgColor="blue.900"
                alignSelf="flex-end">
                <Text fontSize="md" color="white">
                  Mam sa super.
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

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
                alignSelf="flex-end">
                <Text fontSize="md">Super, tesim sa.</Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

        {/* Your Message */}
        <Box alignSelf="flex-end">
          <HStack alignItems="flex-end" mb={3}>
            <VStack>
              <Box
                py={2}
                px={4}
                borderRadius={10}
                bgColor="blue.900"
                alignSelf="flex-end">
                <Text fontSize="md" color="white">
                  xDxD
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>

        {/* Your Message */}
        <Box alignSelf="flex-end">
          <HStack alignItems="flex-end" mb={3}>
            <VStack>
              <Box
                py={2}
                px={4}
                borderRadius={10}
                bgColor="blue.900"
                alignSelf="flex-end">
                <Image
                  source={{
                    uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
                  }}
                  alt="Alternate Text"
                  size="2xl"
                  mr={2}
                />
                <Text fontSize="md" color="white">
                  Tu vyzeras jak keby si sa prave posral
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Type message" />
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
