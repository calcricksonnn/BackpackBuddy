import { useEffect, useState } from 'react';
import { Journey } from './useJourneys';

type Coord = { latitude: number; longitude: number };

export const useJourneyMap = (journeys: Journey[]) => {
  const [coords, setCoords] = useState<Coord[]>([]);
  const [initialRegion, setInitialRegion] = useState<any>(null);

  useEffect(() => {
    const mapped = journeys.map((j) => ({
      latitude: j.location.lat,
      longitude: j.location.lng
    }));

    setCoords(mapped);
    if (mapped.length) {
      const { latitude, longitude } = mapped[0];
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      });
    }
  }, [journeys]);

  return { coords, initialRegion };
};