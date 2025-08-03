import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useChatThreads } from '../hooks/useChatThreads';
import { ChatThreadCard } from '../components/ChatThreadCard';

const InboxScreen: React.FC = () => {
  const navigation = useNavigation();
  const { threads, isLoading, error } = useChatThreads();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>

      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>Something went wrong loading messages.</Text>
        </View>
      )}

      {!isLoading && !error && (
        <FlatList
          data={threads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('ChatRoom', { threadId: item.id })}>
              <ChatThreadCard thread={item} />
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  center: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});