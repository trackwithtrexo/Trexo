//*** AUTHENTICATION CONFIGURATION ***//
export const JWT_KEY = process.env.NEXT_JWT_KEY as string;
export const NODE_ENV = process.env.NEXT_NODE_ENV as string;
export const STORAGE_KEY = process.env.NEXT_LOCALESTORAGE_KEY as string;

//*** SMTP CONFIGURATION ***//
export const SMTP_MAIL = process.env.NEXT_SMTP_MAIL as string;
export const SMTP_PASSWORD = process.env.NEXT_SMTP_PASSWORD as string;

//*** ORIGIN CONFIGURATION ***//
export const CLIENT_URL = process.env.NEXT_CLIENT_URL as string;

//*** GOOGLE CONFIGURATION ***//
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const NEXTAUTH_DEBUG = process.env.NEXTAUTH_DEBUG as string;
