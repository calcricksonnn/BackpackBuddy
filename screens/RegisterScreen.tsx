import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    // Firebase auth logic goes here
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registering user:', form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Image source={require('../assets/icon.png')} style={styles.logo} />

        <View style={styles.card}>
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={form.firstName}
            onChangeText={(val) => handleChange('firstName', val)}
          />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={form.lastName}
            onChangeText={(val) => handleChange('lastName', val)}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            autoCapitalize="none"
            value={form.username}
            onChangeText={(val) => handleChange('username', val)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => handleChange('email', val)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={form.password}
            onChangeText={(val) => handleChange('password', val)}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(val) => handleChange('confirmPassword', val)}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fefefe' },
  scroll: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 80, height: 80, marginBottom: 32 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    paddingHorizontal: 8,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  loginText: { fontSize: 14, color: '#666' },
  loginLink: { color: '#007AFF', fontWeight: '500' },
});