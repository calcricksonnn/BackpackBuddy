import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { Journey } from '../hooks/useJourneys';

type Props = {
  trip: Journey;
};

export const TripCard: React.FC<Props> = ({ trip }) => (
  <Card>
    <Text style={styles.title}>{trip.title}</Text>
    <Text style={styles.date}>{trip.date}</Text>
  </Card>
);

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  date: { fontSize: 13, color: '#666' }
});