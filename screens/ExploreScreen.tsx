import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import ExploreHeader from "../components/ExploreHeader";
import BackpackerCard from "../components/BackpackerCard";
import EventCard from "../components/EventCard";

// Mock Data
const mockUser = {
  name: "Cal",
  avatar: "https://randomuser.me/api/portraits/men/3.jpg",
};

const nearbyBackpackers = [
  {
    id: "1",
    name: "Sophie",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Perth",
    distance: 1.2,
  },
  {
    id: "2",
    name: "James",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    location: "Perth",
    distance: 0.5,
  },
  {
    id: "3",
    name: "Anya",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Perth",
    distance: 2.1,
  },
];

const nearbyEvents = [
  {
    id: "e1",
    title: "Beach BBQ Party",
    location: "Cottesloe Beach",
    date: "04 Aug, 5:00 PM",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: "e2",
    title: "Hostel Pub Crawl",
    location: "Northbridge",
    date: "05 Aug, 8:00 PM",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
];

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <ExploreHeader
          userName={mockUser.name}
          userAvatar={mockUser.avatar}
          onProfilePress={() => console.log("Profile tapped")}
          onNotifPress={() => console.log("Notifications tapped")}
          hasNotifications={true}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backpackers Nearby</Text>
          <FlatList
            data={nearbyBackpackers}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <BackpackerCard
                name={item.name}
                avatar={item.avatar}
                location={item.location}
                distance={item.distance}
                onConnectPress={() => console.log(`Connect to ${item.name}`)}
              />
            )}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Events</Text>
          <FlatList
            data={nearbyEvents}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <EventCard
                title={item.title}
                location={item.location}
                date={item.date}
                image={item.image}
                onJoinPress={() => console.log(`Joined ${item.title}`)}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 20,
    color: "#333",
    marginBottom: 5,
  },
});

export default ExploreScreen;