import React from 'react';
import { Marker } from 'react-native-maps';

type Props = {
  coordinate: { latitude: number; longitude: number };
  title: string;
  type: 'user' | 'meetup' | 'self';
};

export const MapPin: React.FC<Props> = ({ coordinate, title, type }) => (
  <Marker
    coordinate={coordinate}
    title={title}
    pinColor={
      type === 'self' ? 'green' : type === 'user' ? 'blue' : 'orange'
    }
  />
);