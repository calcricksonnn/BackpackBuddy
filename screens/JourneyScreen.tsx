import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useJourneys } from '../hooks/useJourneys';
import { useJourneyMap } from '../hooks/useJourneyMap';
import { TripCard } from '../components/TripCard';

const JourneyScreen: React.FC = () => {
  const { journeys, addJourney, isLoading, error } = useJourneys();
  const { coords, initialRegion } = useJourneyMap(journeys);
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
      <Text style={styles.heading}>Your Journey</Text>

      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Polyline coordinates={coords} strokeColor="#007AFF" strokeWidth={3} />
          {coords.map((c, i) => (
            <Marker key={i} coordinate={c} />
          ))}
        </MapView>
      )}

      {isLoading && <ActivityIndicator size="small" color="#007AFF" />}
      {error && <Text style={styles.error}>Failed to load journeys</Text>}

      <FlatList
        data={journeys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard trip={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>＋</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Journey</Text>
            <TextInput
              placeholder="E.g., Patagonia, Vietnam..."
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <Pressable onPress={handleAdd} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Save</Text>
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

export default JourneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  map: {
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
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