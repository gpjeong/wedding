import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { weddingConfig } from '../config/wedding';

const app = initializeApp(weddingConfig.firebase);
export const db = getFirestore(app);
