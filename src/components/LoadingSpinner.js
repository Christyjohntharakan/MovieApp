import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function LoadingSpinner({ fullScreen = false }) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 32, alignItems: 'center', justifyContent: 'center' },
  fullScreen: { flex: 1, backgroundColor: COLORS.background },
});