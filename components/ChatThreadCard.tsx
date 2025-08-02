import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChatThread } from '../hooks/useChatThreads';

type Props = {
  thread: ChatThread & { lastMessage?: string };
};

export const ChatThreadCard: React.FC<Props> = ({ thread }) => (
  <View style={styles.card}>
    <Image source={{ uri: thread.userAvatar }} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{thread.userName}</Text>
      <Text style={styles.preview} numberOfLines={1}>
        {thread.lastMessage}
      </Text>
    </View>
    <Text style={styles.timestamp}>{new Date(thread.lastTimestamp).toLocaleTimeString()}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontWeight: '600', fontSize: 16 },
  preview: { color: '#555', fontSize: 14 },
  timestamp: { fontSize: 12, color: '#999', marginLeft: 6 }
});