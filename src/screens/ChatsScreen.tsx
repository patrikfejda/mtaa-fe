import {Box, Button, HStack, Image, Text, VStack, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import type {TabScreenProps} from '../types/navigation';

export default function ChatsScreen({navigation}: TabScreenProps<'Chats'>) {
  return (
    <View>
      <Button
        onPress={() =>
          navigation.navigate('Messages', {name: 'Custom message title'})
        }>
        Messages screen
      </Button>
      <View style={styles.messagesContainer}>
        {/* Message */}
        <Box>
          <HStack>
            <Box>
              <Image
                source={{
                  uri: 'https://media.licdn.com/dms/image/C5603AQFhiXz3Wsfikg/profile-displayphoto-shrink_200_200/0/1624210570019?e=1686787200&v=beta&t=RWTnov9vygyEX60DZnBn3dDZLCyOU0ezAmv77K9PD7s',
                }}
                borderRadius={100}
                alt="Alternate Text"
                size="sm"
                mr={2}
              />
            </Box>
            <VStack>
              <Text fontSize="lg" style={styles.senderName}>
                Patrik Fejda
              </Text>
              <Text fontSize="md">Ahoj, ako sa mas?</Text>
            </VStack>
          </HStack>
        </Box>

        {/* Message */}
        <Box>
          <HStack>
            <Box>
              <Image
                source={{
                  uri: 'https://i.pinimg.com/originals/a2/6b/76/a26b761a290847ccf5436460550c4863.png',
                }}
                borderRadius={100}
                alt="Alternate Text"
                size="sm"
                mr={2}
              />
            </Box>
            <VStack>
              <Text fontSize="lg" style={styles.senderName}>
                The chatty squad
              </Text>
              <Text fontSize="md">Dneska Baron??</Text>
            </VStack>
          </HStack>
        </Box>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 10,
  },
  senderName: {
    fontWeight: 'bold',
  },
});
