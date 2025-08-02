import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Journey } from '../hooks/useJourneys';

type Props = { journey: Journey };

export const JourneyCard: React.FC<Props> = ({ journey }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{journey.title}</Text>
    <Text style={styles.date}>{journey.date}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  date: {
    color: '#555',
    fontSize: 13,
    marginTop: 4
  }
});