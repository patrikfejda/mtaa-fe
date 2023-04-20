import {getUserInitials} from '../utils/initials';
import React, {useState} from 'react';
import {Alert, Modal, Button, Text, Pressable, View} from 'react-native';


export default function AppPopup({
    text="Hello World",
}) {
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
                    <Text>{text}</Text>
                    <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>HIDE</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}>
                <Text>SHOW</Text>
            </Pressable>
        </View>
    );
}
