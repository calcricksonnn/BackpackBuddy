import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Meetup } from '../hooks/useMeetups';

type Props = { event: Meetup };

export const EventCard: React.FC<Props> = ({ event }) => (
  <Card>
    <Text style={styles.title}>{event.title}</Text>
    <Text style={styles.location}>{event.location}</Text>
    <Text style={styles.date}>{event.date}</Text>
  </Card>
);

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: '600' },
  location: { fontSize: 14, color: '#555' },
  date: { fontSize: 13, color: '#999' }
});