import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList, Pressable } from 'react-native';
import { useSafetyStore } from '../store/safetyStore';

export const SafetyCenterScreen: React.FC = () => {
  const {
    onlyVerifiedCanMessage,
    toggleMessagingFilter,
    blockedUsers,
    unblockUser
  } = useSafetyStore();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Safety & Privacy</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Your Verification</Text>
        <Text style={styles.verified}>✅ Verified</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Only verified users can message you</Text>
        <Switch value={onlyVerifiedCanMessage} onValueChange={toggleMessagingFilter} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Blocked Users</Text>
        <FlatList
          data={blockedUsers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.blockedRow}>
              <Text style={styles.blocked}>{item}</Text>
              <Pressable onPress={() => unblockUser(item)}>
                <Text style={styles.unblock}>Unblock</Text>
              </Pressable>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Need to report someone?</Text>
        <Text style={styles.link}>Go to Report Center →</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
  section: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 6 },
  verified: { color: 'green', fontWeight: '600' },
  blockedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  blocked: { color: '#333' },
  unblock: { color: '#007aff' },
  link: { color: '#007aff', marginTop: 8 }
});