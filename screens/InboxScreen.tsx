import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChatThreads } from '../hooks/useChatThreads';
import { ChatThreadCard } from '../components/ChatThreadCard';

export const InboxScreen: React.FC = () => {
  const navigation = useNavigation();
  const { threads, isLoading, error } = useChatThreads();

  if (isLoading) return <Text style={{ padding: 16 }}>Loading...</Text>;
  if (error) return <Text style={{ padding: 16, color: 'red' }}>Error loading inbox</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Messages</Text>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('ChatRoom', { threadId: item.id })}>
            <ChatThreadCard thread={item} />
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 64 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  heading: { fontSize: 24, fontWeight: '600', marginBottom: 12 }
});