import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  level: 'new' | 'trusted' | 'superhost';
};

export const TrustBadge: React.FC<Props> = ({ level }) => {
  const labelMap = {
    new: 'New',
    trusted: 'Trusted',
    superhost: 'Superhost'
  };

  const colorMap = {
    new: '#ccc',
    trusted: '#4caf50',
    superhost: '#ff9800'
  };

  return (
    <View style={[styles.badge, { backgroundColor: colorMap[level] }]}>
      <Text style={styles.text}>{labelMap[level]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4
  },
  text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600'
  }
});