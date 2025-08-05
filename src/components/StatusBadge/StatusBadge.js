// src/components/StatusBadge/StatusBadge.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { getStatusBadgeStyle } from '../../utils/statusColors';

const StatusBadge = ({ status }) => {
  const badge = getStatusBadgeStyle(status);
  return (
    <Text
      style={[
        styles.badge,
        {
          color: badge.textColor,
          backgroundColor: badge.backgroundColor,
        },
      ]}
    >
      {status}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
});

export default StatusBadge;
