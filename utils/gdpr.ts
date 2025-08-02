import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { deleteDocument } from '../firebase/db';

// Call this to remove user data from system
export const deleteMyAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');

  await deleteDocument('users', user.uid);
  await deleteUser(user);
};