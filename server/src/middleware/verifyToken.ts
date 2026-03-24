import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// TO THE USER: Root of the server project should have serviceAccountKey.json
// Or set via FIREBASE_SERVICE_ACCOUNT env var
try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.warn('Firebase Admin failed to initialize. Authenticated routes may fail.', error);
}

export interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
