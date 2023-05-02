import Config from 'react-native-config';
import type {WebSocketMessage} from '../types/websocket';
import {WebSocketClientEvent} from '../types/websocket';

const CONNECTION_CHECK_INTERVAL = 500;

function getWebSocketUrl(accessToken: string) {
  return `${Config.WS_BASE_URL}/conversations/ws?token=${accessToken}`;
}

class WebSocketManager {
  private workerTimeoutId: number | null = null;
  private ws: WebSocket | null = null;
  private onOpenCallback = () => {};
  private onCloseCallback = (_event: WebSocketCloseEvent) => {};
  private onErrorCallback = (_event: WebSocketErrorEvent) => {};
  private onMessageCallback = (_event: WebSocketMessageEvent) => {};

  constructor() {}

  onOpen(callback: () => void) {
    this.onOpenCallback = callback;
  }

  onClose(callback: (event: WebSocketCloseEvent) => void) {
    this.onCloseCallback = callback;
  }

  onError(callback: (event: WebSocketErrorEvent) => void) {
    this.onErrorCallback = callback;
  }

  onMessage(callback: (event: WebSocketMessageEvent) => void) {
    this.onMessageCallback = callback;
  }

  isWorkerRunning() {
    return this.workerTimeoutId !== null;
  }

  startWorker(accessToken: string) {
    const startWorkerFunc = () => {
      this.sendMessage({
        token: accessToken,
        event: WebSocketClientEvent.PING,
        data: {},
      });

      if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
        this.ws = new WebSocket(getWebSocketUrl(accessToken));
        this.addListeners();
      }
    };

    startWorkerFunc();
    this.workerTimeoutId = setInterval(
      startWorkerFunc,
      CONNECTION_CHECK_INTERVAL,
    );
  }

  stopWorker() {
    if (this.workerTimeoutId !== null) {
      clearInterval(this.workerTimeoutId);
      this.workerTimeoutId = null;
      this.ws = null;
    }
  }

  sendMessage(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      return true;
    }

    return false;
  }

  private addListeners() {
    this.ws?.addEventListener('open', this.onOpenCallback);
    this.ws?.addEventListener('close', this.onCloseCallback);
    this.ws?.addEventListener('error', this.onErrorCallback);
    this.ws?.addEventListener('message', this.onMessageCallback);
  }
}

export default new WebSocketManager();
