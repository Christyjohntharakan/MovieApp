import React from 'react';
import {
  View, Text, StyleSheet, Dimensions,
  TouchableOpacity, Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { IMAGE_SIZES } from '../constants/api';
import RatingBadge from './RatingBadge';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.55;

export default function HeroSection({ movie, onPlay, onDetails }) {
  if (!movie) return null;

  const backdropUri = movie.backdrop_path
    ? `${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : null;

  return (
    <Pressable style={styles.container} onPress={() => onDetails(movie)}>
      <Image
        source={{ uri: backdropUri }}
        style={styles.backdrop}
        contentFit="cover"
        transition={500}
      />
      <LinearGradient
        colors={['transparent', 'rgba(10,10,15,0.6)', COLORS.background]}
        style={styles.gradient}
        locations={[0, 0.5, 1]}
      />
      <View style={styles.content}>
        <View style={styles.meta}>
          <RatingBadge rating={movie.vote_average} />
          <Text style={styles.year}>
            {movie.release_date?.slice(0, 4)}
          </Text>
        </View>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={2}>
          {movie.overview}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.playBtn} onPress={() => onPlay(movie)}>
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.playText}>Play Trailer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoBtn} onPress={() => onDetails(movie)}>
            <Text style={styles.infoBtnText}>More Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { height: HERO_HEIGHT, width },
  backdrop: { ...StyleSheet.absoluteFillObject },
  gradient: { ...StyleSheet.absoluteFillObject },
  content: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: SPACING.lg,
  },
  meta: {
    flexDirection: 'row', alignItems: 'center',
    gap: SPACING.sm, marginBottom: SPACING.sm,
  },
  year: { color: COLORS.textSecondary, fontSize: 13 },
  title: {
    color: COLORS.text, fontSize: 28,
    fontWeight: '800', marginBottom: SPACING.sm,
    letterSpacing: -0.5,
  },
  overview: {
    color: COLORS.textSecondary, fontSize: 13,
    lineHeight: 19, marginBottom: SPACING.md,
  },
  actions: { flexDirection: 'row', gap: SPACING.sm },
  playBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2, borderRadius: RADIUS.full,
    gap: SPACING.xs,
  },
  playIcon: { fontSize: 12, color: COLORS.background },
  playText: { color: COLORS.background, fontWeight: '700', fontSize: 14 },
  infoBtn: {
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2, borderRadius: RADIUS.full,
    backgroundColor: COLORS.overlayStrong,
  },
  infoBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 14 },
});