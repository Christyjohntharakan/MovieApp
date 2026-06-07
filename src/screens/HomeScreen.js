import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { ENDPOINTS } from '../constants/api';
import { useFetch } from '../hooks/useMovies';
import HeroSection from '../components/HeroSection';
import CategoryRow from '../components/CategoryRow';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomeScreen({ navigation }) {
  const { data: trendingData, loading: trendingLoading } = useFetch(ENDPOINTS.trending);
  const { data: topRatedData, loading: topRatedLoading } = useFetch(ENDPOINTS.topRated);
  const { data: upcomingData, loading: upcomingLoading } = useFetch(ENDPOINTS.upcoming);
  const { data: nowPlayingData, loading: nowPlayingLoading } = useFetch(ENDPOINTS.nowPlaying);

  const heroMovie = useMemo(() => {
    const movies = trendingData?.results;
    return movies ? movies[Math.floor(Math.random() * Math.min(5, movies.length))] : null;
  }, [trendingData]);

  const goToDetail = (movie) => navigation.navigate('MovieDetail', { movie, autoPlay: false });
  const goToTrailer = (movie) => navigation.navigate('MovieDetail', { movie, autoPlay: true });

  if (trendingLoading && !trendingData) return <LoadingSpinner fullScreen />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* App Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🎬 CineVault</Text>
        </View>

        {/* Hero */}
        <HeroSection
          movie={heroMovie}
          onPlay={goToTrailer}
          onDetails={goToDetail}
        />

        {/* Categories */}
        <View style={{ marginTop: SPACING.xl }}>
          <CategoryRow
            title="🔥 Trending Now"
            movies={trendingData?.results?.slice(0, 15)}
            loading={trendingLoading}
            onMoviePress={goToDetail}
          />
          <CategoryRow
            title="⭐ Top Rated"
            movies={topRatedData?.results?.slice(0, 15)}
            loading={topRatedLoading}
            onMoviePress={goToDetail}
          />
          <CategoryRow
            title="🎭 Now Playing"
            movies={nowPlayingData?.results?.slice(0, 15)}
            loading={nowPlayingLoading}
            onMoviePress={goToDetail}
          />
          <CategoryRow
            title="📅 Upcoming Releases"
            movies={upcomingData?.results?.slice(0, 15)}
            loading={upcomingLoading}
            onMoviePress={goToDetail}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { color: COLORS.primary, fontSize: 20, fontWeight: '800' },
});