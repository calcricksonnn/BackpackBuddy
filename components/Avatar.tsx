import React from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  uri: string;
  size?: number;
};

export const Avatar: React.FC<Props> = ({ uri, size = 48 }) => (
  <Image
    source={{ uri }}
    style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
  />
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#eee'
  }
});