import React, { useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet,
  TouchableOpacity, Dimensions, StatusBar, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { IMAGE_SIZES } from '../constants/api';
import { useFetch, useMovieVideos } from '../hooks/useMovies';
import { ENDPOINTS } from '../constants/api';
import RatingBadge from '../components/RatingBadge';
import GenreBadge from '../components/GenreBadge';
import LoadingSpinner from '../components/LoadingSpinner';

const { width } = Dimensions.get('window');

export default function MovieDetailScreen({ route, navigation }) {
  const { movie, autoPlay } = route.params;
  const [playing, setPlaying] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const { data: details } = useFetch(ENDPOINTS.movieDetail(movie.id));
  const { trailer, loading: trailerLoading } = useMovieVideos(movie.id);

  const backdropUri = movie.backdrop_path
    ? `${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : null;

  const runtimeText = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : null;

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=0`
    : null;

  return (
    <View style={styles.container}>
  <StatusBar barStyle="light-content" />
  <ScrollView 
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{ paddingBottom: 60 }}
    style={{ flex: 1 }}
  >

        {/* Backdrop / Trailer Area */}
        <View style={styles.mediaContainer}>
          {playing && trailerUrl ? (
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 'none' }}
            />
          ) : (
            <>
              <Image source={{ uri: backdropUri }} style={styles.backdrop} resizeMode="cover" />
              <LinearGradient
                colors={['transparent', COLORS.background]}
                style={styles.backdropGrad}
              />
              <TouchableOpacity
                style={styles.playOverlay}
                onPress={() => setPlaying(true)}
                disabled={trailerLoading || !trailer}
              >
                {trailerLoading ? (
                  <LoadingSpinner />
                ) : trailer ? (
                  <View style={styles.playCircle}>
                    <Text style={styles.playTriangle}>▶</Text>
                  </View>
                ) : (
                  <Text style={styles.noTrailer}>No Trailer Available</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Movie Info */}
        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>

          {/* Meta row */}
          <View style={styles.metaRow}>
            <RatingBadge rating={movie.vote_average} />
            {movie.release_date && (
              <Text style={styles.metaText}>📅 {movie.release_date.slice(0, 4)}</Text>
            )}
            {runtimeText && <Text style={styles.metaText}>⏱ {runtimeText}</Text>}
          </View>

          {/* Genres */}
          {details?.genres && details.genres.length > 0 && (
            <View style={styles.genres}>
              {details.genres.map((g) => <GenreBadge key={g.id} name={g.name} />)}
            </View>
          )}

          {/* Overview */}
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview} numberOfLines={showFullOverview ? undefined : 4}>
            {movie.overview}
          </Text>
          <TouchableOpacity onPress={() => setShowFullOverview(!showFullOverview)}>
            <Text style={styles.readMore}>
              {showFullOverview ? 'Show Less ↑' : 'Read More ↓'}
            </Text>
          </TouchableOpacity>

          {/* Details table */}
          {details && (
            <View style={styles.detailsCard}>
              {details.original_language && (
                <DetailRow label="Language" value={details.original_language.toUpperCase()} />
              )}
              {details.budget > 0 && (
                <DetailRow label="Budget" value={`$${(details.budget / 1e6).toFixed(1)}M`} />
              )}
              {details.revenue > 0 && (
                <DetailRow label="Revenue" value={`$${(details.revenue / 1e6).toFixed(1)}M`} />
              )}
              {details.vote_count > 0 && (
                <DetailRow label="Votes" value={details.vote_count.toLocaleString()} />
              )}
            </View>
          )}

          {/* Watch Trailer Button */}
          {!playing && trailer && (
            <TouchableOpacity style={styles.trailerBtn} onPress={() => setPlaying(true)}>
              <Text style={styles.trailerBtnText}>▶  Watch Trailer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const DetailRow = ({ label, value }) => (
  <View style={detailStyles.row}>
    <Text style={detailStyles.label}>{label}</Text>
    <Text style={detailStyles.value}>{value}</Text>
  </View>
);

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  label: { color: COLORS.textSecondary, fontSize: 14 },
  value: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, height: '100vh', overflow: 'scroll' },
  mediaContainer: {width: '100%', height: 500, backgroundColor: '#000', overflow: 'hidden' },  backdrop: { ...StyleSheet.absoluteFillObject },
  backdropGrad: { ...StyleSheet.absoluteFillObject },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
  },
  playCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(232,184,75,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  playTriangle: { fontSize: 24, color: COLORS.background, marginLeft: 4 },
  noTrailer: { color: COLORS.textSecondary, fontSize: 14 },
  backBtn: { position: 'absolute', top: 16, left: SPACING.md, zIndex: 10 },
  backText: {
    color: COLORS.text, fontSize: 16, fontWeight: '600',
    backgroundColor: COLORS.overlayStrong,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  info: { padding: SPACING.md },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '800', marginBottom: SPACING.sm },
  metaRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: SPACING.md, marginBottom: SPACING.md, flexWrap: 'wrap',
  },
  metaText: { color: COLORS.textSecondary, fontSize: 13 },
  genres: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: SPACING.md },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: '700', marginBottom: SPACING.sm },
  overview: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  readMore: { color: COLORS.primary, marginTop: SPACING.xs, fontSize: 13, fontWeight: '600' },
  detailsCard: {
    backgroundColor: COLORS.surface, borderRadius: RADIUS.md,
    padding: SPACING.md, marginTop: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.border,
  },
  trailerBtn: {
    marginTop: SPACING.xl, backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md, borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  trailerBtnText: { color: COLORS.background, fontWeight: '700', fontSize: 16 },
});