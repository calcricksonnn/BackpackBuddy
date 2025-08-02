import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

export const getCollection = async (name: string) => {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addToCollection = async (name: string, data: any) => {
  return await addDoc(collection(db, name), data);
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const ref = doc(db, collectionName, id);
  return await updateDoc(ref, data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const ref = doc(db, collectionName, id);
  return await deleteDoc(ref);
};