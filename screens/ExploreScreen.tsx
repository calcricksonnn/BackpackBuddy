import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockUsers } from '../utils/mockData';
import { UserCard } from '../components/UserCard';

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Travellers</Text>
      <FlatList
        data={mockUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => navigation.navigate('Profile', { userId: item.id })} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12
  }
});