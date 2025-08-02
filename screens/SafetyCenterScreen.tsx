import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

const blockedMock = ['catfish89', 'toxicTom'];

export const SafetyCenterScreen: React.FC = () => {
  const [onlyVerifiedCanMessage, setOnlyVerifiedCanMessage] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Safety & Privacy</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Your Verification</Text>
        <Text style={styles.verified}>✅ Verified</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Who can message you</Text>
        <Switch
          value={onlyVerifiedCanMessage}
          onValueChange={setOnlyVerifiedCanMessage}
        />
        <Text style={styles.subtext}>
          {onlyVerifiedCanMessage
            ? 'Only verified users can message you'
            : 'Anyone nearby can message you'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Blocked Users</Text>
        <FlatList
          data={blockedMock}
          renderItem={({ item }) => <Text style={styles.blocked}>{item}</Text>}
          keyExtractor={(item) => item}
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
  subtext: { color: '#777', marginTop: 4 },
  blocked: { paddingVertical: 4, color: '#333' },
  link: { color: '#007aff', marginTop: 8 }
});