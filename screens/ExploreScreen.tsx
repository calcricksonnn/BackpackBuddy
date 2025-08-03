import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const mockTravelers = [
  { id: '1', name: 'Sophie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', location: 'Bali' },
  { id: '2', name: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', location: 'Lisbon' },
  { id: '3', name: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', location: 'Tokyo' },
];

const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>👋 Welcome back, Explorer</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
            <Feather name="mail" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Travelers Nearby */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travelers Nearby</Text>
          <FlatList
            data={mockTravelers}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.userCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userLocation}>{item.location}</Text>
              </View>
            )}
          />
        </View>

        {/* Discover Actions */}
        <View style={styles.actionsRow}>
          <ActionButton icon="walk-outline" color="#007AFF" label="Journey" onPress={() => navigation.navigate('Journey')} />
          <ActionButton icon="calendar-outline" color="#FF6B6B" label="Meetups" onPress={() => navigation.navigate('Meetups')} />
          <ActionButton icon="person-circle-outline" color="#444" label="Profile" onPress={() => navigation.navigate('Profile')} />
        </View>

        {/* Inspiration Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inspiration</Text>
          <View style={styles.postCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f989215542' }}
              style={styles.postImage}
            />
            <View style={styles.postContent}>
              <Text style={styles.postText}>Sunrise hike in Chiang Mai 🇹🇭</Text>
              <Text style={styles.postAuthor}>@wanderwithsophie</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ActionButton = ({ icon, label, color, onPress }: any) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <Ionicons name={icon} size={28} color={color} />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  userCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 6,
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  userLocation: {
    fontSize: 12,
    color: '#888',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  actionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3.5,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionText: {
    marginTop: 8,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 180,
  },
  postContent: {
    padding: 14,
  },
  postText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  postAuthor: {
    fontSize: 13,
    color: '#777',
  },
});