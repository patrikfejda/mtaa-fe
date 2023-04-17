import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {HStack, Icon, IconButton} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <HStack bgColor="muted.800" height="12" justifyContent="center">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const materialIconName =
          (options.tabBarLabel as string) ?? 'question-mark';

        const isFocused = state.index === index;

        const onTabPress = () => {
          navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <IconButton
            onPress={onTabPress}
            icon={
              <Icon
                as={MaterialIcons}
                color={isFocused ? 'primary.500' : 'text.50'}
                name={materialIconName}
              />
            }
            key={route.key}
            borderRadius="0"
            colorScheme="light"
            flex="1"
            p="0"
            size="lg"
          />
        );
      })}
    </HStack>
  );
}
