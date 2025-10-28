import { EmailType,  TokenType } from "@/utils/enum";

//*** SIGN IN ***//
export interface SignIn {
  email: string;
  password: string;
}

//*** SIGN UP ***//
export interface SignUp {
  email: string;
  password: string;
  name: string;
}

//*** CREATE VERIFICATION TOKEN ***//
export interface VerificationToken {
  email: string;
  type: TokenType;
}

export interface Email {
  link: string;
  email: string;
  Type: EmailType;
  data?: {
    category: string;
    amount: number;
    name: string;
    description: string;
    date: Date;
    paidBy: string;
  };
}

export interface ChangePassword {
  token: string;
  password: string;
  confirmPassword?: string;
}

export interface JWTPayload {
  id: string;
  tokenType: string;
}

export interface CookieType {
  key: string;
  data: string;
  maxDays: number;
}

export interface responseData {
  errors?: Record<string, string[]>;
  success?: string;
}

export interface SignInInitialState {
  response: responseData;
  token?: string;
}
export interface ApiErrorPayload {
  message?: string;
  error?: string;
  code?: string;
}

//*** TOKEN DATA ***//
export interface TokenData {
  id: string;
}

export interface changepassword {
  password: string;
  confirmPassword?: string;
}