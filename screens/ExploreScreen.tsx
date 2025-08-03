import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const mockTravelers = [
  {
    id: '1',
    name: 'Emma',
    country: '🇨🇦',
    city: 'Lisbon',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Luca',
    country: '🇮🇹',
    city: 'Lisbon',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: '3',
    name: 'Aisha',
    country: '🇲🇾',
    city: 'Lisbon',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const mockMeetups = [
  {
    id: 'm1',
    title: 'Sunset hike 🌄',
    location: 'Sintra Hills',
    time: 'Today @ 5:30pm',
  },
  {
    id: 'm2',
    title: 'Hostel Tapas Night',
    location: 'Sant Jordi Hostel',
    time: 'Tonight @ 8:00pm',
  },
];

const ExploreScreen = () => {
  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Hey traveler 👋</Text>
        <Text style={styles.subheading}>You’re in Lisbon 🇵🇹</Text>

        {/* Interest Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tags}>
          {['Hiking', 'Food', 'Nightlife', 'Culture', 'Chill'].map((tag) => (
            <TouchableOpacity key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby Travelers */}
        <Text style={styles.sectionTitle}>Nearby Travelers</Text>
        <FlatList
          horizontal
          data={mockTravelers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.travelerCard}>
              <Image source={{ uri: item.image }} style={styles.avatar} />
              <Text style={styles.travelerName}>{item.name}</Text>
              <Text style={styles.travelerLocation}>{item.city} {item.country}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />

        {/* Upcoming Meetups */}
        <Text style={styles.sectionTitle}>Meetups Near You</Text>
        {mockMeetups.map((m) => (
          <View key={m.id} style={styles.meetupCard}>
            <View style={styles.meetupIcon}>
              <MaterialIcons name="event" size={22} color="#fff" />
            </View>
            <View style={styles.meetupText}>
              <Text style={styles.meetupTitle}>{m.title}</Text>
              <Text style={styles.meetupSubtitle}>{m.location} • {m.time}</Text>
            </View>
          </View>
        ))}

        {/* Mini Story Prompt */}
        <TouchableOpacity style={styles.storyPrompt}>
          <FontAwesome5 name="pen" size={14} color="#555" />
          <Text style={styles.storyPromptText}>Share a quick story from your trip...</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subheading: {
    fontSize: 16,
    color: '#eee',
    marginBottom: 16,
  },
  tags: {
    marginVertical: 14,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  tagText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  travelerCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 6,
  },
  travelerName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  travelerLocation: {
    color: '#ccc',
    fontSize: 12,
  },
  meetupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  meetupIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  meetupText: {
    flex: 1,
  },
  meetupTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  meetupSubtitle: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 2,
  },
  storyPrompt: {
    marginTop: 30,
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyPromptText: {
    color: '#ccc',
    marginLeft: 10,
    fontSize: 14,
  },
});