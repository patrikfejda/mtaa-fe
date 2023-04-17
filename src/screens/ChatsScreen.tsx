import {Button, View} from 'native-base';
import React from 'react';
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
    </View>
  );
}
