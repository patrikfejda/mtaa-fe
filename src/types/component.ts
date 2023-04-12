import type {IAlertProps} from 'native-base';

export interface AppToastProps {
  text: string;
  type: IAlertProps['status'];
}
