import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  StyleSheet, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import { useSearch } from '../hooks/useSearch';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useMovies';
import { ENDPOINTS } from '../constants/api';

const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019'];

export default function SearchScreen({ navigation }) {
  const { query, setQuery, results, loading } = useSearch();
  const { data: genreData } = useFetch(ENDPOINTS.genres);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const goToDetail = (movie) => navigation.navigate('MovieDetail', { movie, autoPlay: false });

  const filtered = results.filter((m) => {
    if (selectedYear && !m.release_date?.startsWith(selectedYear)) return false;
    if (selectedGenre && !m.genre_ids?.includes(selectedGenre)) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.inputRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Search movies..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Genre Filter */}
        <View>
          <Text style={styles.filterLabel}>Genre</Text>
          <FlatList
            data={genreData?.genres || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(g) => g.id.toString()}
            contentContainerStyle={{ paddingHorizontal: SPACING.md, gap: SPACING.xs }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, selectedGenre === item.id && styles.chipActive]}
                onPress={() => setSelectedGenre(selectedGenre === item.id ? null : item.id)}
              >
                <Text style={[styles.chipText, selectedGenre === item.id && styles.chipTextActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Year Filter */}
        <View style={{ marginTop: SPACING.sm }}>
          <Text style={styles.filterLabel}>Year</Text>
          <FlatList
            data={YEARS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(y) => y}
            contentContainerStyle={{ paddingHorizontal: SPACING.md, gap: SPACING.xs }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, selectedYear === item && styles.chipActive]}
                onPress={() => setSelectedYear(selectedYear === item ? null : item)}
              >
                <Text style={[styles.chipText, selectedYear === item && styles.chipTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {loading && <LoadingSpinner />}

      {!loading && query && filtered.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🎞️</Text>
          <Text style={styles.emptyText}>No results for "{query}"</Text>
        </View>
      )}

      {!query && (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyText}>Search for a movie above</Text>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={goToDetail}
            style={{ width: '30%', marginHorizontal: '1.5%' }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.md, paddingBottom: SPACING.md },
  title: { color: COLORS.text, fontSize: 26, fontWeight: '800', marginBottom: SPACING.md },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, marginBottom: SPACING.md,
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchIcon: { fontSize: 16, marginRight: SPACING.sm },
  input: {
    flex: 1, color: COLORS.text, fontSize: 16,
    paddingVertical: SPACING.md,
  },
  clear: { color: COLORS.textMuted, fontSize: 16, padding: 4 },
  filterLabel: {
    color: COLORS.textSecondary, fontSize: 12,
    fontWeight: '600', marginBottom: SPACING.sm,
    marginLeft: SPACING.md,
  },
  chip: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full, borderWidth: 1,
    borderColor: COLORS.border, backgroundColor: COLORS.surface,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: COLORS.background },
  grid: { paddingHorizontal: SPACING.md, paddingTop: SPACING.md },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: SPACING.md },
  emptyText: { color: COLORS.textSecondary, fontSize: 16 },
});