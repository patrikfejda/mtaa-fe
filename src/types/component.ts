import type {IAlertProps} from 'native-base';
import type {Message, MessageCreateStore, User} from './api';

export interface AppAvatarProps {
  customFallback?: string;
  size?: 'xs' | 'md' | 'lg';
  user?: User;
}

export interface AppAvatarItemProps {
  date?: string;
  isHighlighted?: boolean;
  title: string;
  titleFontSize?: string;
  titleGrayedOut?: string;
  subtitle?: string;
  avatarCustomFallback?: string;
  user?: User;
}

export interface AppModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface AppModalInstanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AppMessageProps {
  message: Message | MessageCreateStore;
  isMine: boolean;
  isHighlighted?: boolean;
}

export interface AppToastProps {
  text: string;
  type: IAlertProps['status'];
}
