import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Notifications({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = db
      .collection('notifications')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const notifs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setNotifications(notifs);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching notifications:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (notifId) => {
    try {
      await db.collection('notifications').doc(notifId).update({ read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notification, item.read && styles.readNotification]} 
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.type}>Type: {item.type}</Text>
      {item.createdAt?.toDate && (
        <Text style={styles.date}>
          {item.createdAt.toDate().toLocaleString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No notifications yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notification: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  readNotification: {
    backgroundColor: '#eee',
  },
  message: { fontSize: 16, marginBottom: 6 },
  type: { fontSize: 12, color: '#666', marginBottom: 4 },
  date: { fontSize: 12, color: '#999' },
});