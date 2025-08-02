import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MockUser } from '../utils/mockData';

type Props = {
  user: MockUser;
  onPress: () => void;
};

export const UserCard: React.FC<Props> = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.location}>{user.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  bio: {
    fontSize: 14,
    color: '#666'
  },
  location: {
    fontSize: 13,
    color: '#999'
  }
});