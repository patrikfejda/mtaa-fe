import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {HStack, Icon, IconButton, StatusBar, Text, useToken} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AppBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const muted900 = useToken('colors', 'muted.900');

  const headerRightIcons = options.headerRight?.({
    tintColor: options.headerTintColor,
    canGoBack: navigation.canGoBack(),
  });

  return (
    <>
      <StatusBar backgroundColor={muted900} barStyle="light-content" />

      <HStack
        alignItems="center"
        bgColor="muted.900"
        height="12"
        px="2"
        space="4">
        {back?.title && (
          <IconButton
            onPress={navigation.goBack}
            icon={<Icon as={MaterialIcons} color="text.50" name="arrow-back" />}
            colorScheme="light"
            size="lg"
            p="0"
          />
        )}
        <Text fontSize="18" fontWeight="bold">
          {options.title || route.name}
        </Text>

        <HStack ml="auto" space="4">
          {headerRightIcons}
        </HStack>
      </HStack>
    </>
  );
}
