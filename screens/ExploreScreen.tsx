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
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const mockTravelers = [
  { id: '1', name: 'Sophie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', location: 'Bali' },
  { id: '2', name: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', location: 'Lisbon' },
  { id: '3', name: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', location: 'Tokyo' },
  { id: '4', name: 'Carlos', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', location: 'Perth' },
  { id: '5', name: 'Lina', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', location: 'Berlin' },
];

const mockInspiration = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1558981403-c5f989215542?auto=format&fit=crop&w=800&q=80',
    text: 'Sunrise hike in Chiang Mai 🇹🇭',
    author: '@wanderwithsophie',
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    text: 'Surf vibes, Bali mornings 🌊',
    author: '@nomadjames',
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=800&q=80',
    text: 'Tokyo nights with new friends 🗼',
    author: '@anyawanders',
  },
];

const userAvatar =
  'https://randomuser.me/api/portraits/men/3.jpg'; // mock current user pic

const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingBig}>Hey, Cal 👋</Text>
            <Text style={styles.greetingSmall}>Where will you explore today?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: userAvatar }} style={styles.myAvatar} />
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
            contentContainerStyle={{ paddingLeft: 2, paddingBottom: 6 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.userCard}>
                <LinearGradient
                  colors={['#fafafaCC', '#eef2f3CC']}
                  style={styles.avatarBg}
                >
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                </LinearGradient>
                <Text style={styles.userName}>{item.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={13} color="#a2a2a2" style={{ marginRight: 2 }} />
                  <Text style={styles.userLocation}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Discover Actions */}
        <View style={styles.actionsRow}>
          <ActionButton
            icon="map-outline"
            label="Route"
            gradient={['#6EE7B7', '#3B82F6']}
            onPress={() => navigation.navigate('Journey')}
          />
          <ActionButton
            icon="calendar-outline"
            label="Meetups"
            gradient={['#FDE68A', '#FCA5A5']}
            onPress={() => navigation.navigate('Meetups')}
          />
          <ActionButton
            icon="chatbubble-ellipses-outline"
            label="Inbox"
            gradient={['#D8B4FE', '#818CF8']}
            onPress={() => navigation.navigate('Inbox')}
          />
        </View>

        {/* Inspiration Feed */}
        <View style={[styles.section, { marginTop: 4 }]}>
          <Text style={styles.sectionTitle}>Inspiration</Text>
          <FlatList
            data={mockInspiration}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.74 + 22}
            decelerationRate="fast"
            contentContainerStyle={{ paddingLeft: 2, paddingBottom: 14 }}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.93} style={styles.postCard}>
                <Image source={{ uri: item.img }} style={styles.postImage} />
                <LinearGradient
                  colors={['#00000040', '#000000C0']}
                  style={styles.gradientOverlay}
                />
                <View style={styles.postContent}>
                  <Text style={styles.postText}>{item.text}</Text>
                  <Text style={styles.postAuthor}>{item.author}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ActionButton = ({ icon, label, gradient, onPress }: any) => (
  <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.actionCardWrap}>
    <LinearGradient colors={gradient} style={styles.actionCard}>
      <Ionicons name={icon} size={28} color="#fff" />
      <Text style={styles.actionText}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 16,
    marginBottom: 4,
  },
  greetingBig: {
    fontSize: 26,
    fontWeight: '700',
    color: '#232e38',
    letterSpacing: -0.5,
  },
  greetingSmall: {
    fontSize: 15,
    color: '#8898a9',
    marginTop: 1,
    fontWeight: '500',
  },
  myAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#e3e6ee',
    borderWidth: 2,
  },
  section: {
    marginBottom: 26,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 10,
    color: '#242b35',
    letterSpacing: -0.5,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 19,
    alignItems: 'center',
    marginRight: 16,
    width: 94,
    shadowColor: '#2228',
    shadowOpacity: 0.15,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    paddingTop: 14,
    paddingBottom: 10,
  },
  avatarBg: {
    borderRadius: 36,
    padding: 3,
    marginBottom: 5,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 1.5,
    borderColor: '#e8eaed',
    backgroundColor: '#f2f2f4',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f2e41',
    marginTop: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userLocation: {
    fontSize: 12,
    color: '#8898a9',
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginBottom: 16,
    marginTop: 3,
  },
  actionCardWrap: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionCard: {
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    height: 88,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  actionText: {
    marginTop: 7,
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    width: width * 0.74,
    marginRight: 22,
    elevation: 6,
    shadowColor: '#3337',
    shadowOpacity: 0.13,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    overflow: 'hidden',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 180,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  postContent: {
    padding: 15,
  },
  postText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f7fafc',
    marginBottom: 4,
    textShadowColor: '#0006',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  postAuthor: {
    fontSize: 13,
    color: '#fafafa',
    textShadowColor: '#0006',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});