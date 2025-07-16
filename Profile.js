import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore();

export default function Profile({ user, onSaveSuccess }) {
  const [displayName, setDisplayName] = useState('');
  const [nationality, setNationality] = useState('Australia');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!user) return;
    const docRef = db.collection('profiles').doc(user.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        setDisplayName(data.displayName || '');
        setNationality(data.nationality || 'Australia');
        setBio(data.bio || '');
      }
    });
  }, [user]);

  const handleSave = async () => {
    if (!displayName) {
      Alert.alert('Error', 'Please enter a display name');
      return;
    }
    try {
      await db.collection('profiles').doc(user.uid).set({
        displayName,
        nationality,
        bio,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Success', 'Profile saved');
      onSaveSuccess && onSaveSuccess();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Display Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your display name"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <Text style={styles.label}>Nationality</Text>
      <Picker
        selectedValue={nationality}
        onValueChange={(itemValue) => setNationality(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Australia" value="Australia" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="UK" value="UK" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Tell others about yourself"
        value={bio}
        onChangeText={setBio}
        multiline
      />

      <Button title="Save Profile" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  picker: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
});
