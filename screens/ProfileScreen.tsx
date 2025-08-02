import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { useProfile } from '../hooks/useProfile';

export const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, isLoading } = useProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');

  const handleSave = () => {
    updateProfile({ name, bio, location });
    setEditing(false);
  };

  if (isLoading || !profile) {
    return <Text style={{ padding: 16 }}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      {editing ? (
        <>
          <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            style={styles.input}
            multiline
          />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.location}>{profile.location}</Text>
          <Pressable style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: '600', marginBottom: 4 },
  bio: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 4 },
  location: { fontSize: 14, color: '#999', marginBottom: 16 },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12
  },
  button: {
    marginTop: 8,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6
  },
  buttonText: { color: '#fff', fontWeight: '600' }
});