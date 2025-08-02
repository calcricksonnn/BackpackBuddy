import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MockUser } from '../hooks/useUsers';
import { Avatar } from './Avatar';
import { Card } from './Card';

type Props = {
  user: MockUser;
  onPress: () => void;
};

export const UserCard: React.FC<Props> = ({ user, onPress }) => (
  <Pressable onPress={onPress}>
    <Card style={styles.card}>
      <Avatar uri={user.avatar} size={48} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.location}>{user.location}</Text>
      </View>
    </Card>
  </Pressable>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontWeight: '600', fontSize: 16 },
  bio: { color: '#555', fontSize: 14 },
  location: { color: '#999', fontSize: 13 }
});