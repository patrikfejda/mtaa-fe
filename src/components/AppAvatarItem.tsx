import {Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
import type {AppAvatarItemProps} from '../types/component';
import {formatDate} from '../utils/date';
import AppAvatar from './AppAvatar';

export default function AppAvatarItem({
  date,
  isHighlighted,
  title,
  titleFontSize,
  titleGrayedOut,
  subtitle,
  user,
}: AppAvatarItemProps) {
  return (
    <HStack space="2.5">
      <AppAvatar user={user} />
      <VStack justifyContent="center" flex="1">
        {/* NOTE: React Native doesn't support relative line height */}
        {/* TODO fontWeight is not inherited */}
        <HStack fontWeight="medium" space="1">
          <Text
            color={isHighlighted ? 'text.50' : 'text.400'}
            fontSize={titleFontSize ?? 'md'}
            lineHeight="20px">
            {title}
          </Text>
          {titleGrayedOut && (
            <Text color="text.500" fontSize="md" lineHeight="20px">
              ({titleGrayedOut})
            </Text>
          )}
          {date && (
            <Center
              ml="1"
              px="2"
              borderWidth="1px"
              borderRadius="xs"
              borderColor="muted.800">
              <Text fontSize="xs" color="text.500" lineHeight="15px">
                {formatDate(date)}
              </Text>
            </Center>
          )}
        </HStack>
        {subtitle && (
          <Text
            color={isHighlighted ? 'text.50' : 'text.400'}
            numberOfLines={1}
            fontSize="xs"
            lineHeight="15px">
            {subtitle}
          </Text>
        )}
      </VStack>
    </HStack>
  );
}
