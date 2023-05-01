export enum WebSocketClientEvent {
  CREATE_CONVERSATION = 'CREATE_CONVERSATION',
  CREATE_MESSAGE = 'CREATE_MESSAGE',
}

export enum WebSocketServerEvent {
  NEW_CONVERSATION = 'NEW_CONVERSATION',
  NEW_MESSAGE = 'NEW_MESSAGE',
}

export interface WebSocketMessage<T extends object = object> {
  token: string;
  event: WebSocketClientEvent | WebSocketServerEvent;
  data: T;
}
