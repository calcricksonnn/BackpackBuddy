import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Meetup } from '../hooks/useMeetups';

type Props = {
  event: Meetup;
};

export const EventCard: React.FC<Props> = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{event.title}</Text>
    <Text style={styles.details}>{event.location}</Text>
    <Text style={styles.details}>{event.date}</Text>
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
  details: {
    fontSize: 14,
    color: '#666'
  }
});