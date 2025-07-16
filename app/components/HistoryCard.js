import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HistoryCard = ({ activity, members, status, date, isPiscine, isPaid }) => {
  let statusIcon;
  let statusColor = '#999';

  if (status === 'validé') {
    statusIcon = <Ionicons name="checkmark-circle-outline" size={20} color="#32CD32" />;
    statusColor = '#32CD32';
  } else if (status === 'en attente') {
    statusIcon = <MaterialIcons name="pending" size={20} color="#FACC15" />;
    statusColor = '#FACC15';
  } else if (status === 'refusé') {
    statusIcon = <Ionicons name="close-circle-outline" size={20} color="#DC2626" />;
    statusColor = '#DC2626';
  }

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.activity}>{activity}</Text>
        {statusIcon}
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.date}>{date}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
      </View>

      <View style={styles.rowBetween}>
        {isPiscine && (
          <Text style={styles.paidStatus}>{isPaid ? 'Payé' : 'Non payé'}</Text>
        )}
        <Text style={styles.members}>Membres: {members.join(', ')}</Text>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.19)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  activity: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#ccc',
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  paidStatus: {
    color: '#1FA739',
    fontSize: 14,
    fontWeight: '500',
  },
  members: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
