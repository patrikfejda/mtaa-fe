export interface User {
  id: number;
  email: string;
  username: string;
  displayName?: string;
  profilePhotoUrl?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
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
