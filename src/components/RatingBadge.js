import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function RatingBadge({ rating }) {
  const score = parseFloat(rating).toFixed(1);
  const color = score >= 7.5 ? '#4ECDC4' : score >= 6 ? COLORS.primary : COLORS.accent;
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.star]}>★</Text>
      <Text style={[styles.text, { color }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: SPACING.sm, paddingVertical: 3,
    borderRadius: RADIUS.full, borderWidth: 1,
    backgroundColor: COLORS.surface,
  },
  star: { fontSize: 10, color: COLORS.ratingGold },
  text: { fontSize: 12, fontWeight: '700' },
});