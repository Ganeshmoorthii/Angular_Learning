export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  contactNumbers: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
  contactNumbers: string[];
}