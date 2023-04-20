import {getUserInitials} from '../utils/initials';
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';


export default function AppPopup({}) {
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
                <View>
                <View>
                    <Text>Hello World!</Text>
                    <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>Hide Modal</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text>Show Modal</Text>
            </Pressable>
        </View>
    );
}
