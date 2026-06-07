import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { ENDPOINTS } from '../constants/api';
import { useFetch } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TABS = [
  { label: 'Top Rated', endpoint: ENDPOINTS.topRated },
  { label: 'Upcoming', endpoint: ENDPOINTS.upcoming },
  { label: 'Now Playing', endpoint: ENDPOINTS.nowPlaying },
];

export default function ExploreScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading } = useFetch(TABS[activeTab].endpoint);

  const goToDetail = (movie) =>
    navigation.navigate('MovieDetail', { movie, autoPlay: false });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.tabs}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tab, i === activeTab && styles.tabActive]}
            onPress={() => setActiveTab(i)}
          >
            <Text style={[styles.tabText, i === activeTab && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <LoadingSpinner fullScreen />
      ) : (
        <FlatList
          data={data?.results || []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={goToDetail}
              style={{ width: '30%', marginHorizontal: '1.5%', marginBottom: 12 }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: {
    color: COLORS.text, fontSize: 26, fontWeight: '800',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
  },
  tabs: {
    flexDirection: 'row', paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md, gap: SPACING.sm,
  },
  tab: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: COLORS.background },
  grid: { paddingHorizontal: SPACING.md },
});