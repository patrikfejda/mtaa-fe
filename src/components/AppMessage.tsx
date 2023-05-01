import {Box, HStack, Text, VStack} from 'native-base';
import React from 'react';
import type {AppMessageProps} from '../types/component';
import AppAvatar from './AppAvatar';

export default function AppMessage({message, isMine}: AppMessageProps) {
  return (
    <HStack alignItems="flex-end" space="2">
      {isMine === false && (
        <Box pb="0.5">
          <AppAvatar user={message.author} size="xs" />
        </Box>
      )}
      <VStack flex="1" space="0.5">
        {isMine === false && (
          <Text color="text.600" fontSize="xs" px="2.5">
            {message.author.displayName || message.author.username}
          </Text>
        )}
        <Box
          bgColor={isMine ? 'primary.600' : 'muted.700'}
          borderBottomLeftRadius={isMine === false ? '0' : 'md'}
          borderBottomRightRadius={isMine ? '0' : 'md'}
          mt={isMine ? '2' : '0'}
          ml={isMine ? '56px' : '0'}
          mr={isMine === false ? '8' : '0'}
          borderRadius="md"
          px="2.5"
          py="2">
          {message.text}
        </Box>
      </VStack>
    </HStack>
  );
}
