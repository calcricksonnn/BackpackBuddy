import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Explore({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('profiles')
        .where(firebase.firestore.FieldPath.documentId(), '!=', user.uid)
        .get();

      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(result);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.name || 'Unnamed Traveler'}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {users.length === 0 ? (
        <Text style={styles.empty}>No travelers found</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14, color: '#555' },
  empty: { textAlign: 'center', marginTop: 30, fontSize: 16 },
});