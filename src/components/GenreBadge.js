import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function GenreBadge({ name }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1, borderColor: COLORS.border,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  text: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
});