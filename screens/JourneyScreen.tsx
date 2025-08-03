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
      <Text style={styles.heading}>My Journeys</Text>

      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Polyline coordinates={coords} strokeColor="#007aff" strokeWidth={3} />
          {coords.map((c, i) => (
            <Marker key={i} coordinate={c} />
          ))}
        </MapView>
      )}

      {isLoading && <ActivityIndicator />}
      {error && <Text style={styles.error}>Failed to load journeys</Text>}

      <FlatList
        data={journeys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard trip={item} />}
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

export default JourneyScreen; // ✅ Add this line