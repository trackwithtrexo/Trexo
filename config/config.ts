//*** DATABASE CONFIGURATION ***//
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const DIRECT_URL = process.env.DIRECT_URL as string;

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
export const GOOGLE_CLIENT_ID = process.env.NEXT_GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.NEXT_GOOGLE_CLIENT_SECRET as string;