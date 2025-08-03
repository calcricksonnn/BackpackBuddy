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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

// Mock data
const activeTravelers = [
  { id: '1', name: 'Sophie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', city: 'Bali', flag: '🇮🇩', active: true, distance: 1.2 },
  { id: '2', name: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', city: 'Lisbon', flag: '🇵🇹', active: true, distance: 3.6 },
  { id: '3', name: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', city: 'Tokyo', flag: '🇯🇵', active: false, distance: 7.8 },
  { id: '4', name: 'Carlos', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', city: 'Perth', flag: '🇦🇺', active: true, distance: 2.4 },
  { id: '5', name: 'Lina', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', city: 'Berlin', flag: '🇩🇪', active: true, distance: 0.8 },
];
const meetups = [
  { id: '1', title: 'Beach BBQ & Sunset', when: 'Tonight, 6pm', where: 'Jurien Bay', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', joined: 8 },
  { id: '2', title: 'Pub Crawl', when: 'Today, 8pm', where: 'Cervantes Tavern', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', joined: 14 },
  { id: '3', title: 'Sandboarding Trip', when: 'Tomorrow, 9am', where: 'Lancelin Dunes', img: 'https://images.unsplash.com/photo-1558981403-c5f989215542?auto=format&fit=crop&w=800&q=80', joined: 5 },
];
const notices = [
  { id: '1', author: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', msg: 'Anyone keen for sunrise hiking tomorrow?', time: '13m', replies: 2 },
  { id: '2', author: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', msg: 'Looking for ride shares north!', time: '1h', replies: 4 },
  { id: '3', author: 'Sophie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', msg: 'Party tonight? Who’s in?', time: '10m', replies: 8 },
];
const myAvatar = 'https://randomuser.me/api/portraits/men/3.jpg';

const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* HERO */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80' }} style={styles.heroImg} blurRadius={2.2} />
          <LinearGradient colors={['#0000', '#16181db7']} style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroGreet}>Welcome back, Cal!</Text>
            <Text style={styles.heroLocation}><Ionicons name="location-outline" size={16} color="#fff" /> Cervantes, WA</Text>
          </View>
          <TouchableOpacity style={styles.heroInbox} onPress={() => navigation.navigate('Inbox')}>
            <MaterialIcons name="mail-outline" size={25} color="#fff" />
            <View style={styles.unreadBadge}><Text style={styles.unreadBadgeText}>3</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heroAvatarWrap} onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: myAvatar }} style={styles.heroAvatar} />
          </TouchableOpacity>
        </View>

        {/* ACTIVE TRAVELERS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travelers Nearby</Text>
            <TouchableOpacity><Text style={styles.seeAllBtn}>See all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={activeTravelers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingLeft: 4, paddingBottom: 8 }}
            renderItem={({ item }) => (
              <View style={styles.travelerCard}>
                <Image source={{ uri: item.avatar }} style={styles.travelerAvatar} />
                <View style={item.active ? styles.activeDot : styles.awayDot} />
                <Text style={styles.travelerName}>{item.name}</Text>
                <View style={styles.travelerSubRow}>
                  <Text style={styles.travelerFlag}>{item.flag}</Text>
                  <Text style={styles.travelerDist}>{item.distance}km</Text>
                </View>
                <TouchableOpacity style={styles.waveBtn}><Text style={styles.waveBtnText}>👋 Wave</Text></TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* MEETUPS & EVENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meetups & Events</Text>
            <TouchableOpacity><Text style={styles.seeAllBtn}>See all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={meetups}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingLeft: 4 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.meetupCard}>
                <Image source={{ uri: item.img }} style={styles.meetupImg} />
                <View style={styles.meetupOverlay} />
                <View style={styles.meetupContent}>
                  <Text style={styles.meetupTitle}>{item.title}</Text>
                  <Text style={styles.meetupMeta}>{item.when} • {item.where}</Text>
                  <View style={styles.meetupRow}>
                    <Ionicons name="people" size={14} color="#fff" />
                    <Text style={styles.meetupJoined}>{item.joined} Going</Text>
                  </View>
                  <TouchableOpacity style={styles.joinBtn}><Text style={styles.joinBtnText}>Join</Text></TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* NOTICEBOARD */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Noticeboard</Text>
            <TouchableOpacity><Text style={styles.seeAllBtn}>New post</Text></TouchableOpacity>
          </View>
          {notices.map((item) => (
            <View style={styles.noticeCard} key={item.id}>
              <Image source={{ uri: item.avatar }} style={styles.noticeAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.noticeMsg}><Text style={{ fontWeight: '700', color: '#3B82F6' }}>{item.author}</Text> {item.msg}</Text>
                <View style={styles.noticeMeta}>
                  <Text style={styles.noticeTime}>{item.time} ago</Text>
                  <Text style={styles.noticeReply}>{item.replies} replies</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.replyBtn}><Text style={styles.replyBtnText}>Reply</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* POST BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
        activeOpacity={0.85}
      >
        <LinearGradient colors={['#3B82F6', '#818CF8']} style={styles.fabGrad}>
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExploreScreen;

// --- STYLES ---
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },

  // HERO
  heroWrap: { height: 120, borderBottomLeftRadius: 36, borderBottomRightRadius: 36, overflow: 'hidden', marginBottom: 10, position: 'relative' },
  heroImg: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
  heroContent: { position: 'absolute', left: 22, bottom: 18, zIndex: 3 },
  heroGreet: { color: '#fff', fontSize: 18, fontWeight: '700', letterSpacing: 0.1, marginBottom: 2 },
  heroLocation: { color: '#e2e9f7', fontSize: 14, fontWeight: '500', letterSpacing: 0.1 },
  heroInbox: { position: 'absolute', top: 17, right: 80, zIndex: 10, backgroundColor: '#2227', borderRadius: 18, padding: 5 },
  unreadBadge: { position: 'absolute', top: -4, right: -5, backgroundColor: '#FF6B6B', borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  unreadBadgeText: { color: '#fff', fontWeight: '700', fontSize: 10, paddingHorizontal: 2 },
  heroAvatarWrap: { position: 'absolute', top: 14, right: 22, zIndex: 11, borderRadius: 25, overflow: 'hidden', borderColor: '#fff', borderWidth: 2 },
  heroAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#c9dbfc' },

  // SECTION
  section: { marginBottom: 22, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#232e38' },
  seeAllBtn: { fontSize: 13, fontWeight: '600', color: '#6A86F7' },

  // TRAVELER CARDS
  travelerCard: { backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', marginRight: 12, width: 98, shadowColor: '#2229', shadowOpacity: 0.13, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3, paddingTop: 14, paddingBottom: 10, position: 'relative', marginTop: 6 },
  travelerAvatar: { width: 54, height: 54, borderRadius: 27, marginBottom: 5, borderWidth: 2, borderColor: '#e0e7ef' },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4ADE80', position: 'absolute', top: 16, right: 13, borderWidth: 1.2, borderColor: '#fff' },
  awayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#bdbdbd', position: 'absolute', top: 16, right: 13, borderWidth: 1.2, borderColor: '#fff' },
  travelerName: { fontSize: 15, fontWeight: '700', color: '#222d3d', marginTop: 1 },
  travelerSubRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  travelerFlag: { fontSize: 14, marginRight: 5 },
  travelerDist: { fontSize: 11, color: '#6b7280', fontWeight: '500' },
  waveBtn: { marginTop: 7, backgroundColor: '#e6eeff', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 12 },
  waveBtnText: { color: '#3B82F6', fontWeight: '700', fontSize: 13 },

  // MEETUPS
  meetupCard: { backgroundColor: '#fff', borderRadius: 22, width: width * 0.7, marginRight: 18, elevation: 5, shadowColor: '#3a387a60', shadowOpacity: 0.13, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, overflow: 'hidden', position: 'relative', marginTop: 6, },
  meetupImg: { width: '100%', height: 110 },
  meetupOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#18192540', },
  meetupContent: { position: 'absolute', bottom: 10, left: 0, right: 0, padding: 15, zIndex: 2 },
  meetupTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 3, textShadowColor: '#0008', textShadowRadius: 5, },
  meetupMeta: { color: '#e7eaf3', fontSize: 13, marginBottom: 6 },
  meetupRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  meetupJoined: { color: '#fff', marginLeft: 5, fontWeight: '700', fontSize: 13 },
  joinBtn: { alignSelf: 'flex-start', backgroundColor: '#6A86F7', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 15, marginTop: 2 },
  joinBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  // NOTICEBOARD
  noticeCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 14, marginBottom: 11, padding: 12, shadowColor: '#3336', shadowOpacity: 0.09, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  noticeAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 11, marginTop: 2 },
  noticeMsg: { fontSize: 14.5, color: '#2a3240', marginBottom: 5 },
  noticeMeta: { flexDirection: 'row', gap: 8 },
  noticeTime: { color: '#818cf8', fontSize: 12, fontWeight: '700', marginRight: 8 },
  noticeReply: { color: '#aaa', fontSize: 12, fontWeight: '700' },
  replyBtn: {
    marginLeft: 10,
    alignSelf: 'center',
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  replyBtnText: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: 13,
  },

  // FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    bottom: 26,
    right: 22,
    zIndex: 100,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 10,
  },
  fabGrad: {
    borderRadius: 35,
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
  },
});