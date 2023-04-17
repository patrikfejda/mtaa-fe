import {Text, View} from 'native-base';
import React from 'react';
import type {TabScreenProps} from '../types/navigation';

export default function StatusScreen({}: TabScreenProps<'Status'>) {
  return (
    <View>
      <Text>TODO STATUS</Text>
    </View>
  );
}
