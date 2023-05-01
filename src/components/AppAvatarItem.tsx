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
  avatarCustomFallback,
  user,
}: AppAvatarItemProps) {
  return (
    <HStack
      flexShrink="1"
      alignItems="center"
      height="12"
      width="full"
      space="2.5">
      <AppAvatar customFallback={avatarCustomFallback} user={user} />
      <VStack justifyContent="center" flex="1">
        {/* NOTE: React Native doesn't support relative line height */}
        <HStack space="1">
          <Text
            color={isHighlighted ? 'text.50' : 'text.400'}
            fontSize={titleFontSize ?? 'md'}
            numberOfLines={1}
            flexShrink="1"
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
