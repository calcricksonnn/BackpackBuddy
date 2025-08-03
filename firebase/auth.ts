import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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

  await setDoc(doc(db, 'users', uid), {
    uid,
    email,
    firstName,
    lastName,
    username,
    createdAt: serverTimestamp(),
  });

  return uid;
};

export const login = async (email: string, password: string) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) throw new Error('User not found');

  return uid;
};