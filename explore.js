import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Explore({ user, onStartChat }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRoute, setSelectedUserRoute] = useState([]);
  const [filterDate, setFilterDate] = useState(null); // For future date filtering

  const db = firebase.firestore();

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

  const fetchMatches = async () => {
    try {
      const userStops = await fetchUserStops();

      if (userStops.length === 0) {
        setMatches([]);
        setLoading(false);
        return;
      }

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

  const fetchUserRoute = async (userId) => {
    const snapshot = await db
      .collection('routes')
      .doc(userId)
      .collection('stops')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const openUserModal = async (user) => {
    setSelectedUser(user);
    const route = await fetchUserRoute(user.id);
    setSelectedUserRoute(route);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
    setSelectedUserRoute([]);
  };

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
    <TouchableOpacity style={styles.card} onPress={() => openUserModal(item)}>
      <Text style={styles.name}>{item.name || 'Unnamed Traveler'}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Button title="Chat" onPress={() => onStartChat(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Modal for user profile + route */}
      <Modal visible={!!selectedUser} animationType="slide" onRequestClose={closeUserModal}>
        <View style={styles.modalContainer}>
          <Button title="Close" onPress={closeUserModal} />
          {selectedUser && (
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedUser.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedUser.email}</Text>

              <Text style={styles.routeTitle}>Route:</Text>
              {selectedUserRoute.length === 0 ? (
                <Text style={styles.empty}>No route stops</Text>
              ) : (
                selectedUserRoute.map((stop, index) => (
                  <View key={index} style={styles.routeStop}>
                    <Text style={styles.location}>{stop.location}</Text>
                    {stop.date ? <Text style={styles.date}>Date: {stop.date}</Text> : null}
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>
      </Modal>
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
  email: { fontSize: 14, color: '#555', marginBottom: 8 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  modalSubtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  routeTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  routeStop: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  location: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 14, color: '#777' },
  empty: { fontStyle: 'italic', color: '#777' },
});