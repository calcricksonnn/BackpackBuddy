// firebase/auth.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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