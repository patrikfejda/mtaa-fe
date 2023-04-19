import type {IAlertProps} from 'native-base';
import type {User} from './api';

export interface AppAvatarProps {
  customFallback?: string;
  size?: 'xs' | 'md' | 'lg';
  user: User;
}

export interface AppAvatarItemProps {
  date?: string;
  isHighlighted?: boolean;
  title: string;
  titleFontSize?: string;
  titleGrayedOut?: string;
  subtitle?: string;
  user: User;
}

export interface AppToastProps {
  text: string;
  type: IAlertProps['status'];
}
