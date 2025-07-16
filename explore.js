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
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  // Step 1: Get user's stops
  const fetchUserStops = async () => {
    const snapshot = await db
      .collection('routes')
      .doc(user.uid)
      .collection('stops')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    return snapshot.docs.map((doc) => doc.data().location);
  };

  // Step 2: Find other users with matching stops
  const fetchMatches = async () => {
    try {
      const userStops = await fetchUserStops();

      if (userStops.length === 0) {
        setMatches([]);
        setLoading(false);
        return;
      }

      // Query all profiles except current user who have route stops in userStops
      // Firestore doesn't support joins, so we do a two-step process:
      // 1) Find user IDs who have matching stops
      // 2) Fetch those profiles

      // Step 2a: Find matching user IDs
      const stopsQuery = await db
        .collectionGroup('stops')
        .where('location', 'in', userStops)
        .get();

      const userIdSet = new Set();
      stopsQuery.forEach((doc) => {
        if (doc.ref.parent.parent.id !== user.uid) {
          userIdSet.add(doc.ref.parent.parent.id);
        }
      });

      if (userIdSet.size === 0) {
        setMatches([]);
        setLoading(false);
        return;
      }

      // Step 2b: Fetch profiles of matching users
      const profilesSnapshot = await db
        .collection('profiles')
        .where(firebase.firestore.FieldPath.documentId(), 'in', Array.from(userIdSet))
        .get();

      const matchedProfiles = profilesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMatches(matchedProfiles);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No matching travelers found on your route yet.</Text>
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
      <Text style={styles.title}>Travelers on your route:</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
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
});