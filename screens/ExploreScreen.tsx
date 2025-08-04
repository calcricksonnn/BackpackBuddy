import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from './components/AppHeader';
import NearbyBackpackersSection from './components/NearbyBackpackersSection';
import LocalEventsSection from './components/LocalEventsSection';
import ActiveGroupsSection from './components/ActiveGroupsSection';
import NearbyActivitySection from './components/NearbyActivitySection';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <NearbyBackpackersSection />
        <NearbyActivitySection />
        <LocalEventsSection />
        <ActiveGroupsSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollViewContent: {
    paddingVertical: 20,
    gap: 20,
  },
});

export default ExploreScreen;