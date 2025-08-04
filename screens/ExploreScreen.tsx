import React, { useState } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  ScrollView, FlatList, SafeAreaView, StatusBar, Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const myAvatar = "https://randomuser.me/api/portraits/men/3.jpg";
const heroBg = "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=900&q=80";
const fakePeople = [
  { id: "1", name: "Maya", avatar: "https://randomuser.me/api/portraits/women/68.jpg", flag: "🇩🇪", status: "Surfing this week", },
  { id: "2", name: "Jack", avatar: "https://randomuser.me/api/portraits/men/52.jpg", flag: "🇬🇧", status: "Wants hiking buddy", },
];
const meetups = [
  { id: "1", title: "Hostel BBQ", time: "Tonight 7pm", location: "Courtyard", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", joined: 8 },
];
const shoutouts = [
  { id: "1", author: "Yuki", avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "Anyone driving south tomorrow?", replies: 3, time: "11m" },
];

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"} />
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        {/* HERO & CHECK-IN */}
        <View style={styles.hero}>
          <Image source={{ uri: heroBg }} style={styles.heroBg} />
          <View style={styles.heroRow}>
            <Image source={{ uri: myAvatar }} style={styles.avatar} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.hello}>Welcome back, Cal 👋</Text>
              <Text style={styles.sub}>Cervantes • 17° Sunny</Text>
            </View>
          </View>
          {!checkedIn && (
            <TouchableOpacity
              style={styles.checkInBtn}
              onPress={() => setCheckedIn(true)}
              activeOpacity={0.88}
            >
              <Ionicons name="location" size={17} color="#fff" />
              <Text style={styles.checkInTxt}>Check in to Cervantes</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* WHO'S HERE NOW */}
        {checkedIn && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who’s here now?</Text>
            <FlatList
              data={fakePeople}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8, paddingLeft: 10 }}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.userCard}>
                  <Image source={{ uri: item.avatar }} style={styles.userCardAvatar} />
                  <Text style={styles.userCardName}>{item.flag} {item.name}</Text>
                  <Text style={styles.userCardStatus}>{item.status}</Text>
                  <TouchableOpacity style={styles.connectBtn}>
                    <Ionicons name="person-add" size={16} color="#fff" />
                    <Text style={styles.connectTxt}>Connect</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}

        {/* MEETUPS & EVENTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meetups & Events</Text>
          <FlatList
            data={meetups}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.meetupCard}>
                <Image source={{ uri: item.img }} style={styles.meetupImg} />
                <Text style={styles.meetupTitle}>{item.title}</Text>
                <Text style={styles.meetupMeta}>{item.time} • {item.location}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="people" color="#3B82F6" size={16} />
                  <Text style={styles.meetupJoined}>{item.joined} joined</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* SHOUTOUTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shoutouts</Text>
          {shoutouts.map(item => (
            <View key={item.id} style={styles.shoutoutCard}>
              <Image source={{ uri: item.avatar }} style={styles.shoutoutAvatar} />
              <View style={styles.shoutoutContent}>
                <Text style={styles.shoutoutMsg}>
                  <Text style={{ fontWeight: "700", color: "#3B82F6" }}>{item.author} </Text>
                  {item.text}
                </Text>
                <View style={styles.shoutoutMetaRow}>
                  <Text style={styles.shoutoutTime}>{item.time} ago</Text>
                  <Text style={styles.shoutoutReplies}>{item.replies} replies</Text>
                  <TouchableOpacity style={styles.shoutoutReplyBtn}>
                    <Text style={styles.shoutoutReplyBtnTxt}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fbff" },
  hero: { backgroundColor: "#e5edfa", padding: 18, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, marginBottom: 13, overflow: "hidden" },
  heroBg: { position: "absolute", width: "100%", height: "100%", opacity: 0.15 },
  heroRow: { flexDirection: "row", alignItems: "center", marginBottom: 13 },
  avatar: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: "#fff", backgroundColor: "#f4f8ff" },
  hello: { fontSize: 17, fontWeight: "800", color: "#22325e", marginBottom: 1 },
  sub: { color: "#3B82F6", fontWeight: "700", fontSize: 13 },
  checkInBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#3B82F6", borderRadius: 22, paddingVertical: 8, paddingHorizontal: 19, alignSelf: "flex-start", marginTop: 3, },
  checkInTxt: { color: "#fff", fontWeight: "700", marginLeft: 7, fontSize: 15 },

  section: { marginBottom: 20, marginTop: 2, paddingHorizontal: 10, },
  sectionTitle: { fontSize: 17, fontWeight: "900", color: "#1e293b", marginBottom: 6, letterSpacing: -0.1, },

  userCard: { backgroundColor: "#fff", borderRadius: 18, padding: 13, alignItems: "center", width: 125, marginRight: 12, shadowColor: "#72b2fa", shadowOpacity: 0.08, shadowOffset: { width: 0, height: 4 }, shadowRadius: 11, },
  userCardAvatar: { width: 45, height: 45, borderRadius: 22.5, marginBottom: 7, borderWidth: 1.5, borderColor: "#dbeafe", backgroundColor: "#f1f7fe" },
  userCardName: { fontWeight: "700", color: "#23427d", fontSize: 14, },
  userCardStatus: { fontSize: 12, color: "#64748b", fontWeight: "600", marginVertical: 4 },
  connectBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#3B82F6", borderRadius: 17, paddingVertical: 4, paddingHorizontal: 10, marginTop: 2 },
  connectTxt: { color: "#fff", fontWeight: "700", fontSize: 13, marginLeft: 4 },

  meetupCard: { width: 170, backgroundColor: "#fff", borderRadius: 19, marginRight: 10, shadowColor: "#72b2fa", shadowOpacity: 0.09, shadowRadius: 11, shadowOffset: { width: 0, height: 3 }, overflow: "hidden", padding: 8, },
  meetupImg: { width: "100%", height: 73, borderRadius: 14, marginBottom: 7, },
  meetupTitle: { color: "#22325e", fontWeight: "900", fontSize: 14, },
  meetupMeta: { color: "#3B82F6", fontWeight: "700", fontSize: 12.5, marginBottom: 1, },
  meetupJoined: { color: "#3B82F6", fontWeight: "700", fontSize: 12, marginLeft: 5 },

  shoutoutCard: { flexDirection: "row", alignItems: "flex-start", backgroundColor: "#fff", borderRadius: 15, padding: 10, marginBottom: 9, shadowColor: "#83b3f3", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, },
  shoutoutAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10, backgroundColor: "#f1f7fe", borderWidth: 1, borderColor: "#c7e4ff", },
  shoutoutContent: { flex: 1 },
  shoutoutMsg: { color: "#22325e", fontSize: 13.5, marginBottom: 4 },
  shoutoutMetaRow: { flexDirection: "row", alignItems: "center", gap: 13 },
  shoutoutTime: { color: "#60A5FA", fontSize: 11.5, fontWeight: "700" },
  shoutoutReplies: { color: "#a6b2cf", fontSize: 11.5, fontWeight: "500" },
  shoutoutReplyBtn: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8, backgroundColor: "#e7f0fa", marginLeft: 6, },
  shoutoutReplyBtnTxt: { color: "#3B82F6", fontWeight: "700", fontSize: 12, },
});

export default ExploreScreen;