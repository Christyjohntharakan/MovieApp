import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

export default function CategoryRow({ title, movies, loading, onMoviePress, onSeeAll }) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All →</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={onMoviePress} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
          getItemLayout={(_, index) => ({
            length: 160, offset: 160 * index, index,
          })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: SPACING.xl },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  title: { color: COLORS.text, fontSize: 17, fontWeight: '700' },
  seeAll: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  list: { paddingHorizontal: SPACING.md },
});