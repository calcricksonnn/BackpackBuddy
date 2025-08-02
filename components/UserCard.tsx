import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MockUser } from '../hooks/useUsers';
import { Avatar } from './Avatar';
import { Card } from './Card';
import { ReportUserModal } from './ReportUserModal';
import { useReports } from '../hooks/useReports';

type Props = {
  user: MockUser;
  onPress: () => void;
};

export const UserCard: React.FC<Props> = ({ user, onPress }) => {
  const [reportVisible, setReportVisible] = useState(false);
  const { reportUser } = useReports();

  return (
    <>
      <Pressable onPress={onPress}>
        <Card style={styles.card}>
          <Avatar uri={user.avatar} size={48} />
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <Text style={styles.location}>{user.location}</Text>

            <Pressable onPress={() => setReportVisible(true)}>
              <Text style={styles.report}>Report</Text>
            </Pressable>
          </View>
        </Card>
      </Pressable>

      <ReportUserModal
        userId={user.id}
        visible={reportVisible}
        onClose={() => setReportVisible(false)}
        onReport={reportUser}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  info: { marginLeft: 12, flex: 1 },
  name: { fontWeight: '600', fontSize: 16 },
  bio: { color: '#555', fontSize: 14 },
  location: { color: '#999', fontSize: 13 },
  report: {
    marginTop: 6,
    fontSize: 13,
    color: '#e53935'
  }
});