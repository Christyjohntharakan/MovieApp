import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { IMAGE_SIZES } from '../constants/api';
import RatingBadge from './RatingBadge';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.38;

export default function MovieCard({ movie, onPress, style }) {
  const posterUri = movie.poster_path
    ? `${IMAGE_SIZES.poster.medium}${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress(movie)}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: posterUri }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.year}>
          {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
        </Text>
        {movie.vote_average > 0 && (
          <RatingBadge rating={movie.vote_average} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  info: { padding: SPACING.sm },
  title: { color: COLORS.text, fontSize: 12, fontWeight: '600', marginBottom: 2 },
  year: { color: COLORS.textMuted, fontSize: 11, marginBottom: 4 },
});