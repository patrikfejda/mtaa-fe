import { getUserInitials } from '../utils/initials';
import React, { useState } from 'react';
import { Alert, Modal, Button, Text, Pressable, View } from 'react-native';

export default function AppPopup({ view }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>{view}</View>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>HIDE</Text>
        </Pressable>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>SHOW</Text>
      </Pressable>
    </View>
  );
}
