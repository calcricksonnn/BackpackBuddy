import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, Pressable } from 'react-native';

type Props = {
  userId: string;
  visible: boolean;
  onClose: () => void;
  onReport: (userId: string, reason: string) => void;
};

export const ReportUserModal: React.FC<Props> = ({ userId, visible, onClose, onReport }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onReport(userId, reason.trim());
    setReason('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.box}>
          <Text style={styles.title}>Report User</Text>
          <TextInput
            placeholder="Why are you reporting this user?"
            value={reason}
            onChangeText={setReason}
            style={styles.input}
            multiline
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.cancel}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  box: { margin: 24, backgroundColor: '#fff', borderRadius: 8, padding: 20 },
  title: { fontWeight: '600', fontSize: 18, marginBottom: 12 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 6, padding: 12, minHeight: 80 },
  button: { backgroundColor: '#e53935', marginTop: 12, padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff' },
  cancel: { marginTop: 8, alignItems: 'center' }
});