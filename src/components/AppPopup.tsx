import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert, Modal, Pressable, Text, View } from 'react-native';

export default function AppPopup({ view }) {
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
          {view}
          <Pressable
            style={{
              backgroundColor: '#fff',
              alignSelf: 'flex-end',
              marginRight: 20,
              marginBottom: 20,
              padding: 10,
              borderRadius: 20,
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <MaterialIcons name="close" size={10} color="#000" />
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={{
          backgroundColor: '#fff',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 20,
        }}
        onPress={() => setModalVisible(true)}>
        <Text>SHOW</Text>
      </Pressable>
    </View>
  );
}
