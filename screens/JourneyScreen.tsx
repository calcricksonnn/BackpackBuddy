import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, Modal, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useJourneys } from '../hooks/useJourneys';
import { JourneyCard } from '../components/JourneyCard';

export const JourneyScreen: React.FC = () => {
  const { journeys, addJourney, isLoading, error } = useJourneys();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addJourney({ title: newTitle });
    setNewTitle('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Journeys</Text>

      {isLoading && <ActivityIndicator />}
      {error && <Text style={styles.error}>Failed to load journeys</Text>}

      <FlatList
        data={journeys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JourneyCard journey={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>＋</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Journey</Text>
            <TextInput
              placeholder="Trip to Patagonia..."
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
            />
            <Pressable onPress={handleAdd} style={styles.modalButton}>
              <Text style={{ color: '#fff' }}>Add</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  error: { color: 'red' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 32,
    backgroundColor: '#000',
    borderRadius: 28,
    padding: 12,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addText: { fontSize: 28, color: '#fff' },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  cancelButton: { marginTop: 12, alignItems: 'center' }
});