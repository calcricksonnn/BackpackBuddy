import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  text: string;
  isOwn: boolean;
};

export const ChatBubble: React.FC<Props> = ({ text, isOwn }) => (
  <View style={[styles.bubble, isOwn ? styles.own : styles.other]}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 4
  },
  own: {
    backgroundColor: '#007aff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0
  },
  other: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0
  },
  text: {
    color: '#000'
  }
});