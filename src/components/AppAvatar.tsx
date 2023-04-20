import {Avatar} from 'native-base';
import React from 'react';
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
      source={{uri: user.profilePhotoUrl}}
      bg="primary.600">
      {customFallback ?? getUserInitials(user)}
    </Avatar>
  );
}
