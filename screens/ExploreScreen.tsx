import React from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  ScrollView, Dimensions, SafeAreaView, StatusBar, Platform
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// ---- MOCK DATA ----
const checkIn = { place: 'Cervantes YHA', city: 'Cervantes', travelers: 12 };
const whosUpFor = [
  { id: 1, msg: "Who's up for sandboarding?", author: 'Lina' },
  { id: 2, msg: "Who's got room in a campervan?", author: 'James' },
  { id: 3, msg: "Who's keen for a beer tonight?", author: 'Anya' },
];
const yourPlan = { event: 'Sunset BBQ on the Beach', time: 'Today, 6pm', attendees: 9 };
const activeTravelers = [
  { id: '1', name: 'Sophie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', active: true, flag: '🇮🇩', distance: 1.2, role: 'Hostel legend' },
  { id: '2', name: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', active: true, flag: '🇵🇹', distance: 3.6, role: 'Just arrived' },
  { id: '3', name: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', active: false, flag: '🇯🇵', distance: 7.8, role: 'First timer' },
];
const meetups = [
  { id: '1', title: 'Beach BBQ', when: 'Tonight 6pm', where: 'Jurien Bay', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', joined: 9, hot: true },
  { id: '2', title: 'Pub Crawl', when: 'Tonight 8pm', where: 'Cervantes Tavern', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', joined: 14, hot: false },
];
const notices = [
  { id: '1', author: 'Anya', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', msg: 'Anyone keen for sunrise hiking tomorrow?', time: '13m', replies: 2 },
  { id: '2', author: 'James', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', msg: 'Looking for ride shares north!', time: '1h', replies: 4 },
];
const myAvatar = 'https://randomuser.me/api/portraits/men/3.jpg';

// ---- MAIN SCREEN ----
const ExploreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* CHECK IN */}
        <View style={styles.checkinBar}>
          <Ionicons name="location-sharp" size={20} color="#3B82F6" />
          <Text style={styles.checkinText}>
            Checked in: <Text style={{ fontWeight: '700' }}>{checkIn.place}</Text>
            <Text style={styles.cityText}> ({checkIn.city})</Text>
            {' — '}
            <Text style={{ color: '#22c55e', fontWeight: '700' }}>{checkIn.travelers} travelers here</Text>
          </Text>
        </View>

        {/* WHO'S UP FOR... */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.whosUpBar}>
          {whosUpFor.map((item) => (
            <TouchableOpacity style={styles.whosUpCard} key={item.id}>
              <Ionicons name="sparkles" size={16} color="#F59E42" style={{ marginRight: 5 }} />
              <Text style={styles.whosUpText}>{item.msg}</Text>
              <Text style={styles.whosUpAuthor}>by {item.author}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* YOUR PLAN */}
        {yourPlan &&
          <TouchableOpacity style={styles.yourPlanBar}>
            <Ionicons name="alarm-outline" size={18} color="#22c55e" />
            <Text style={styles.yourPlanText}>
              <Text style={{ fontWeight: '700', color: '#22c55e' }}>{yourPlan.event}</Text> — <Text style={{ color: '#818cf8' }}>{yourPlan.time}</Text>
            </Text>
            <View style={styles.yourPlanAttendees}>
              <Ionicons name="people" size={15} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13, marginLeft: 4 }}>{yourPlan.attendees} going</Text>
            </View>
          </TouchableOpacity>
        }

        {/* ACTIVE TRAVELERS NEARBY */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travelers Nearby</Text>
            <TouchableOpacity><Text style={styles.seeAllBtn}>See all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={activeTravelers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingLeft: 4, paddingBottom: 8 }}
            renderItem={({ item }) => (
              <View style={styles.travelerCard}>
                <Image source={{ uri: item.avatar }} style={styles.travelerAvatar} />
                <View style={item.active ? styles.activeDot : styles.awayDot} />
                <Text style={styles.travelerName}>{item.name}</Text>
                <Text style={styles.travelerFlag}>{item.flag} • {item.distance}km</Text>
                <Text style={styles.travelerRole}>{item.role}</Text>
                <TouchableOpacity style={styles.waveBtn}><Text style={styles.waveBtnText}>👋 Wave</Text></TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* HOT MEETUPS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meetups & Events</Text>
            <TouchableOpacity><Text style={styles.seeAllBtn}>See all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={meetups}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingLeft: 4, paddingBottom: 5 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.meetupCard}>
                <Image source={{ uri: item.img }} style={styles.meetupImg} />
                {item.hot && <View style={styles.hotBadge}><Text style={styles.hotBadgeText}>HOT</Text></View>}
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
            <TouchableOpacity><Text style={styles.seeAllBtn}>Post</Text></TouchableOpacity>
          </View>
          {notices.map(item => (
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
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePost')} activeOpacity={0.87}>
        <LinearGradient colors={['#3B82F6', '#818CF8']} style={styles.fabGrad}>
          <Ionicons name="add" size={32} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExploreScreen;

// --------- STYLES ---------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },

  // Check In Bar
  checkinBar: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#e8f1ff', borderRadius: 14, margin: 16, marginBottom: 4, },
  checkinText: { marginLeft: 7, fontSize: 15, color: '#20334c', fontWeight: '600', flex: 1 },
  cityText: { color: '#666', fontWeight: '500' },

  // Who's Up For
  whosUpBar: { marginTop: 3, marginBottom: 10 },
  whosUpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8ed', borderRadius: 22, paddingVertical: 7, paddingHorizontal: 14, marginRight: 13, shadowColor: '#f59e4277', shadowOpacity: 0.07, shadowRadius: 7, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  whosUpText: { fontSize: 15, color: '#e38200', fontWeight: '700', marginRight: 6 },
  whosUpAuthor: { fontSize: 12, color: '#818cf8', marginLeft: 5, fontWeight: '600' },

  // Your Plan Bar
  yourPlanBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e6ffed', borderRadius: 14, marginHorizontal: 16, marginTop: 2, marginBottom: 10, paddingVertical: 8, paddingHorizontal: 12, elevation: 1, },
  yourPlanText: { marginLeft: 7, fontSize: 15, color: '#18a069', fontWeight: '600', flex: 1 },
  yourPlanAttendees: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#a5b4fc', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 7, marginLeft: 8, },

  // Section/Headers
  section: { marginBottom: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#232e38' },
  seeAllBtn: { fontSize: 13, fontWeight: '600', color: '#6A86F7' },

  // Traveler Cards
  travelerCard: { backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', marginRight: 13, width: 98, shadowColor: '#2229', shadowOpacity: 0.11, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2, paddingTop: 14, paddingBottom: 10, position: 'relative', marginTop: 6 },
  travelerAvatar: { width: 54, height: 54, borderRadius: 27, marginBottom: 5, borderWidth: 2, borderColor: '#e0e7ef' },
  activeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4ADE80', position: 'absolute', top: 16, right: 13, borderWidth: 1.2, borderColor: '#fff' },
  awayDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#bdbdbd', position: 'absolute', top: 16, right: 13, borderWidth: 1.2, borderColor: '#fff' },
  travelerName: { fontSize: 15, fontWeight: '700', color: '#222d3d', marginTop: 1 },
  travelerFlag: { fontSize: 13, marginTop: 1, color: '#2a2a38' },
  travelerRole: { fontSize: 11, color: '#10b981', fontWeight: '700', backgroundColor: '#a7f3d0', borderRadius: 7, paddingHorizontal: 6, paddingVertical: 1.5, marginTop: 2 },
  waveBtn: { marginTop: 7, backgroundColor: '#e6eeff', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 12 },
  waveBtnText: { color: '#3B82F6', fontWeight: '700', fontSize: 13 },

  // Meetups
  meetupCard: { backgroundColor: '#fff', borderRadius: 22, width: width * 0.7, marginRight: 18, elevation: 5, shadowColor: '#3a387a60', shadowOpacity: 0.11, shadowRadius: 8, shadowOffset: { width: 0, height: 5 }, overflow: 'hidden', position: 'relative', marginTop: 6 },
  meetupImg: { width: '100%', height: 110 },
  hotBadge: { position: 'absolute', top: 10, left: 12, backgroundColor: '#F43F5E', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, zIndex: 2 },
  hotBadgeText: { color: '#fff', fontWeight: '800', fontSize: 11, letterSpacing: 0.3 },
  meetupContent: { position: 'absolute', bottom: 10, left: 0, right: 0, padding: 15, zIndex: 2 },
  meetupTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 3, textShadowColor: '#0008', textShadowRadius: 5 },
  meetupMeta: { color: '#e7eaf3', fontSize: 13, marginBottom: 6 },
  meetupRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
  meetupJoined: { color: '#fff', marginLeft: 5, fontWeight: '700', fontSize: 13 },
  joinBtn: { alignSelf: 'flex-start', backgroundColor: '#6A86F7', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 15, marginTop: 2 },
  joinBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  // Noticeboard
  noticeCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 14, marginBottom: 11, padding: 12, shadowColor: '#3336', shadowOpacity: 0.09, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  noticeAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 11, marginTop: 2 },
  noticeMsg: { fontSize: 14.5, color: '#2a3240', marginBottom: 5 },
  noticeMeta: { flexDirection: 'row', gap: 8 },
  noticeTime: { color: '#818cf8', fontSize: 12, fontWeight: '700', marginRight: 8 },
  noticeReply: { color: '#aaa', fontSize: 12, fontWeight: '700' },
  replyBtn: { marginLeft: 10, alignSelf: 'center', backgroundColor: '#E0E7FF', borderRadius: 8, paddingVertical: 5, paddingHorizontal: 14 },
  replyBtnText: { color: '#3B82F6', fontWeight: '700', fontSize: 13 },

  // FAB
  fab: { position: 'absolute', bottom: 26, right: 22, zIndex: 100, shadowColor: '#3B82F6', shadowOpacity: 0.23, shadowOffset: { width: 0, height: 6 }, shadowRadius: 18, elevation: 10 },
  fabGrad: { borderRadius: 35, width: 62, height: 62, alignItems: 'center', justifyContent: 'center' },
});