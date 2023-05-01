export interface User {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  profilePhotoUrl?: string;
}

// TODO reorder this file plain, requests, responses

export interface Conversation {
  id: number;
  synchronizationKey: string;
  name: string;
  isGroup: boolean;
  createdAt: string;
  author: User;
  users: User[];
  messages: Message[];
}

export interface ConversationCreateRequest {
  synchronizationKey: string;
  name: string;
  isGroup: boolean;
  userIds: number[];
}

export interface ConversationCreateStore extends ConversationCreateRequest {
  author: User;
  messages: Message[] | MessageCreateStore[];
  users: User[];
}

export interface Message {
  id: number;
  synchronizationKey: string;
  conversationId: number;
  text: string;
  createdAt: string;
  author: User;
}
export interface MessageCreateRequest {
  synchronizationKey: string;
  conversationId: number;
  text: string;
}

export interface MessageCreateStore extends MessageCreateRequest {
  author: User;
}

export interface Status {
  id: number;
  latitude: string;
  longitude: string;
  text: string;
  createdAt: string;
  author: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface StatusRequest {
  latitude: string;
  longitude: string;
  text: string;
}

export interface StatusDeleteRequest {
  id: number;
}

export interface UserChangeRequest {
  displayName: string;
  profilePhoto: File;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
