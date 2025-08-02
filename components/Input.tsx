import React from 'react';
import { TextInput, StyleSheet, View, Text, ViewStyle } from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  multiline?: boolean;
};

export const Input: React.FC<Props> = ({ label, ...rest }) => (
  <View style={styles.wrapper}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput {...rest} style={[styles.input, rest.style]} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff'
  }
});