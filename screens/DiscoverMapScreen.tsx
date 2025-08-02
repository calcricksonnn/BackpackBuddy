import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

type Pin = {
  id: string;
  type: 'user' | 'meetup';
  title: string;
  coordinate: { latitude: number; longitude: number };
};

const mockPins: Pin[] = [
  {
    id: 'u1',
    type: 'user',
    title: 'Alice',
    coordinate: { latitude: 37.7749, longitude: -122.4194 }
  },
  {
    id: 'm1',
    type: 'meetup',
    title: 'Surf Meetup 🌊',
    coordinate: { latitude: 37.779, longitude: -122.417 }
  }
];

export const DiscoverMapScreen: React.FC = () => {
  const [region, setRegion] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      });
    })();
  }, []);

  if (!region) {
    return <Text style={{ padding: 16 }}>Fetching location...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {mockPins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={pin.coordinate}
            title={pin.title}
            pinColor={pin.type === 'user' ? 'blue' : 'orange'}
          />
        ))}
        <Marker
          coordinate={region}
          title="You"
          pinColor="green"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});