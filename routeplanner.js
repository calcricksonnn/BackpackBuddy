import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function RoutePlanner({ user }) {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [route, setRoute] = useState([]);

  const db = firebase.firestore();

  const addStop = async () => {
    if (!location.trim()) {
      Alert.alert('Please enter a location');
      return;
    }
    try {
      await db
        .collection('routes')
        .doc(user.uid)
        .collection('stops')
        .add({
          location: location.trim(),
          date: date.trim() || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setLocation('');
      setDate('');
      fetchRoute();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchRoute = async () => {
    const snapshot = await db
      .collection('routes')
      .doc(user.uid)
      .collection('stops')
      .orderBy('createdAt', 'desc')
      .get();

    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setRoute(result);
  };

  useEffect(() => {
    fetchRoute();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.location}>{item.location}</Text>
      {item.date ? <Text style={styles.date}>Date: {item.date}</Text> : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a stop to your route</Text>
      <TextInput
        style={styles.input}
        placeholder="Location (e.g., Sydney)"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (optional)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Stop" onPress={addStop} />

      <Text style={styles.subtitle}>Your route:</Text>
      <FlatList
        data={route}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No stops yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginTop: 20, fontWeight: '600' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
  },
  location: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});