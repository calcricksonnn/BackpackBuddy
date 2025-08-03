import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { useProfile } from '../hooks/useProfile';

const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, isLoading } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setBio(profile.bio ?? '');
      setLocation(profile.location ?? '');
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name, bio, location });
    setEditing(false);
  };

  if (isLoading || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profile.avatar || 'https://i.pravatar.cc/150?img=3' }}
        style={styles.avatar}
      />

      {editing ? (
        <>
          <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            multiline
            style={[styles.input, styles.textArea]}
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          <Pressable onPress={() => setEditing(false)} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.location}>{profile.location}</Text>
          <Pressable style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#888',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancel: {
    marginTop: 12,
  },
  cancelText: {
    color: '#888',
  },
});