import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export default function Profile({ user, onSaveSuccess }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [interests, setInterests] = useState('');
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore();
  const storage = firebase.storage();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const doc = await db.collection('profiles').doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data();
          setName(data.name || '');
          setBio(data.bio || '');
          setTravelDates(data.travelDates || '');
          setInterests(data.interests || '');
          setPhotoURL(data.photoURL || null);
        }
      } catch (error) {
        console.log('Error loading profile:', error);
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage.ref().child(`profilePhotos/${user.uid}`);
      await ref.put(blob);
      const url = await ref.getDownloadURL();
      setPhotoURL(url);
    } catch (error) {
      Alert.alert('Upload failed', 'Could not upload image. Please try again.');
      console.log(error);
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required.');
      return;
    }

    setLoading(true);
    try {
      await db.collection('profiles').doc(user.uid).set(
        {
          name,
          bio,
          travelDates,
          interests,
          photoURL,
        },
        { merge: true }
      );
      onSaveSuccess();
      Alert.alert('Success', 'Profile saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile.');
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>Tap to add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Name*</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Text style={styles.label}>Travel Dates</Text>
      <TextInput
        value={travelDates}
        onChangeText={setTravelDates}
        style={styles.input}
        placeholder="e.g. June 1 - June 15"
      />

      <Text style={styles.label}>Interests</Text>
      <TextInput
        value={interests}
        onChangeText={setInterests}
        style={styles.input}
        placeholder="e.g. hiking, food, photography"
      />

      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  photoContainer: { alignSelf: 'center', marginBottom: 20 },
  photo: { width: 120, height: 120, borderRadius: 60 },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: { color: '#666', textAlign: 'center' },
  label: { fontWeight: 'bold', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
});