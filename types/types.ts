export type FinancialData = {
  income: number;
  expense: number;
};

export type Expense = {
  id: string;
  userId: string;
  category: string;
  amount: string;
  date: string;
  description: string;
};

export type Income = {
  id: string;
  userId: string;
  category: string;
  amount: string;
  date: string;
  description: string;
};

export type FinancialData_ = {
  expense: Expense[];
  income: Income[];
};

export interface CookieType {
  key: string;
  data: string;
  maxDays: number;
}

export interface JWTPayload {
  id: string;
  tokenType: string;
}

export interface TokenData {
  id: string;
}
