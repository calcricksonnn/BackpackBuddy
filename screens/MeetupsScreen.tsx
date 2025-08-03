import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useMeetups } from '../hooks/useMeetups';
import { EventCard } from '../components/EventCard';

const MeetupsScreen: React.FC = () => {
  const { meetups, addMeetup, isLoading, error } = useMeetups();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addMeetup({ title: newTitle, location: newLocation });
    setNewTitle('');
    setNewLocation('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Meetups</Text>

      {isLoading && <ActivityIndicator size="small" color="#007AFF" />}
      {error && <Text style={styles.error}>Could not load meetups</Text>}

      <FlatList
        data={meetups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>＋</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Meetup</Text>

            <TextInput
              style={styles.input}
              placeholder="E.g. Yoga on the beach"
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor="#aaa"
            />

            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newLocation}
              onChangeText={setNewLocation}
              placeholderTextColor="#aaa"
            />

            <Pressable onPress={handleAdd} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Add</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeetupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    padding: 12,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addText: {
    fontSize: 30,
    color: '#fff',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 14,
  },
});