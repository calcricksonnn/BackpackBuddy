import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default function Meetups({ user, onStartChat }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [error, setError] = useState(null);

  const db = firebase.firestore();
  const pageSize = 5;

  // Fetch meetups with pagination
  const fetchMeetups = async (loadMore = false) => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      let query = db.collection('meetups').orderBy('date', 'asc').limit(pageSize);
      if (loadMore && lastDoc) {
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();

      if (snapshot.empty && !loadMore) {
        setMeetups([]);
        setLastDoc(null);
      } else {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setMeetups(loadMore ? [...meetups, ...data] : data);
      }
    } catch (e) {
      console.error('Error loading meetups:', e);
      setError('Failed to load meetups.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  // Check if user is attending a meetup
  const isUserAttending = (meetup) => {
    if (!meetup.attendees) return false;
    return meetup.attendees.some((att) => att.id === user.uid);
  };

  // RSVP or cancel RSVP
  const toggleRSVP = async (meetup) => {
    try {
      const meetupRef = db.collection('meetups').doc(meetup.id);

      if (isUserAttending(meetup)) {
        // Remove user from attendees
        await meetupRef.update({
          attendees: firebase.firestore.FieldValue.arrayRemove({
            id: user.uid,
            name: user.displayName || 'Unknown',
            email: user.email || '',
            photoURL: user.photoURL || null,
          }),
        });
        Alert.alert('RSVP cancelled', `You are no longer attending "${meetup.title}".`);
      } else {
        // Add user to attendees
        await meetupRef.update({
          attendees: firebase.firestore.FieldValue.arrayUnion({
            id: user.uid,
            name: user.displayName || 'Unknown',
            email: user.email || '',
            photoURL: user.photoURL || null,
          }),
        });
        Alert.alert('RSVP confirmed', `You are now attending "${meetup.title}".`);
      }

      // Refresh meetups to reflect change
      fetchMeetups();
    } catch (e) {
      console.error('Error updating RSVP:', e);
      Alert.alert('Error', 'Could not update your RSVP. Please try again.');
    }
  };

  // Render an attendee with avatar and chat button
  const renderAttendee = (attendee) => (
    <View key={attendee.id} style={styles.attendeeRow}>
      {attendee.photoURL ? (
        <Image source={{ uri: attendee.photoURL }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarInitial}>{attendee.name ? attendee.name[0].toUpperCase() : '?'}</Text>
        </View>
      )}
      <Text style={styles.attendeeName}>{attendee.name || 'Unnamed'}</Text>
      <Button title="Chat" onPress={() => onStartChat(attendee)} />
    </View>
  );

  // Render a single meetup card
  const renderMeetup = ({ item }) => {
    const attending = isUserAttending(item);
    const attendeesCount = item.attendees ? item.attendees.length : 0;
    const formattedDate = item.date?.toDate ? item.date.toDate().toLocaleString() : new Date(item.date).toLocaleString();

    return (
      <View style={styles.meetupCard}>
        <Text style={styles.meetupTitle}>{item.title}</Text>
        <Text style={styles.meetupDate}>{formattedDate}</Text>
        <Text style={styles.meetupDesc}>{item.description}</Text>

        <Button
          title={attending ? 'Cancel RSVP' : 'RSVP to Meetup'}
          onPress={() => toggleRSVP(item)}
          color={attending ? '#d9534f' : '#5cb85c'}
        />

        <Text style={styles.attendeesHeader}>Attendees ({attendeesCount}):</Text>
        {attendeesCount > 0 ? (
          item.attendees.map(renderAttendee)
        ) : (
          <Text style={styles.noAttendees}>No attendees yet</Text>
        )}
      </View>
    );
  };

  // Render footer button for loading more meetups
  const renderFooter = () => {
    if (!lastDoc) return null;
    if (loadingMore) {
      return <ActivityIndicator style={{ marginVertical: 10 }} size="small" color="#007BFF" />;
    }
    return (
      <Button title="Load More Meetups" onPress={() => fetchMeetups(true)} />
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
        <Button title="Try Again" onPress={() => fetchMeetups()} />
      </View>
    );
  }

  if (meetups.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No meetups available yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={meetups}
      keyExtractor={(item) => item.id}
      renderItem={renderMeetup}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  meetupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  meetupTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  meetupDate: { fontSize: 14, color: '#666', marginBottom: 10 },
  meetupDesc: { fontSize: 16, marginBottom: 10 },
  attendeesHeader: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  attendeeName: { flex: 1, fontSize: 15, marginLeft: 8 },
  noAttendees: { fontStyle: 'italic', color: '#999' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontWeight: 'bold',
  },
});