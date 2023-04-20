import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { Box } from 'native-base';

export default function AppPopup({ viewOpen, viewClosed, showButtonText = 'SHOW' }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
        <Box backgroundColor="primary.700">
          <Pressable
            style={{
              alignSelf: 'flex-end',
              marginRight: 2,
              marginTop: 2,
              padding: 10,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <MaterialIcons name="close" size={10} color="#000" />
          </Pressable>

          {viewOpen}

        </Box>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}>
            {viewClosed}
      </Pressable>
    </View>
  );
}
