import {Alert} from 'native-base';
import React from 'react';
import type {AppToastProps} from '../types/component';

export default function AppToast({text, type}: AppToastProps) {
  return (
    <Alert status={type} variant="solid" py="2.5">
      {text}
    </Alert>
  );
}
