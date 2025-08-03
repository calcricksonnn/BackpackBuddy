// firebase/auth.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './firestore';

export const register = async (
  email: string,
  password: string,
  fullName: string,
  username: string
) => {
  const [firstName, lastName = ''] = fullName.split(' ');

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const profile = {
    uid,
    email,
    firstName,
    lastName,
    username,
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', uid), profile);
  return profile;
};

export const login = async (email: string, password: string) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const docRef = doc(db, 'users', uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error('User profile not found.');
  }

  return snapshot.data();
};