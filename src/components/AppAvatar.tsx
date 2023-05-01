import {Avatar} from 'native-base';
import React from 'react';
import Config from 'react-native-config';
import type {AppAvatarProps} from '../types/component';
import {getUserInitials} from '../utils/initials';

export default function AppAvatar({
  customFallback,
  size = 'md',
  user,
}: AppAvatarProps) {
  return (
    <Avatar
      size={size === 'md' ? '42px' : size}
      source={{
        uri: user?.profilePhotoUrl
          ? `${Config.IMG_BASE_URL}${user.profilePhotoUrl}`
          : undefined,
      }}
      bg="primary.600"
      _text={{
        fontWeight: 'medium',
      }}>
      {customFallback ?? (user ? getUserInitials(user) : 'xx')}
    </Avatar>
  );
}
