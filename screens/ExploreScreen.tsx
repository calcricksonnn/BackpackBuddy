import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1516442719524-a603408c90cb' }}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar translucent backgroundColor="transparent" />

      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.95)']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.container}>

        <Animatable.Text animation="fadeInDown" delay={150} style={styles.heroTitle}>
          Find your people.
        </Animatable.Text>

        <Animatable.Text animation="fadeInDown" delay={300} style={styles.heroSubtitle}>
          BackpackBuddy connects global travelers through real adventures and shared stories.
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" delay={500} style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="map-outline" size={26} color="#fff" />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.optionTitle}>Explore the Map</Text>
              <Text style={styles.optionSubtitle}>See who’s nearby and where they're heading</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={styles.row}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="travel-explore" size={26} color="#fff" />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.optionTitle}>Global Feed</Text>
              <Text style={styles.optionSubtitle}>Real-time stories from backpackers worldwide</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Chats')} style={styles.row}>
            <View style={styles.iconCircle}>
              <Feather name="message-circle" size={26} color="#fff" />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.optionTitle}>Group Chats</Text>
              <Text style={styles.optionSubtitle}>Connect with travelers by interest or location</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.row}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="calendar-alt" size={24} color="#fff" />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.optionTitle}>Upcoming Events</Text>
              <Text style={styles.optionSubtitle}>Join hikes, hostel meetups, or group treks</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.Text animation="fadeInUp" delay={800} style={styles.footerQuote}>
          ✈️ “Your journey is better shared.”
        </Animatable.Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  iconCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  textColumn: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  footerQuote: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
  },
});