export interface User {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  profilePhotoUrl?: string;
}

interface StatusResponse {
  id: number;
  latitude: string;
  longitude: string;
  text: string;
  created_at: string;
  author: User;
}


export interface LoginRequest {
  username: string;
  password: string;
}

export interface StatusRequest {
  latitude: string
  longitude: string
  text: string
}

interface StatusDeleteRequest {
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
