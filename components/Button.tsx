import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({ title, onPress, style, disabled }) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, style, disabled && styles.disabled]}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: '600'
  },
  disabled: {
    opacity: 0.5
  }
});