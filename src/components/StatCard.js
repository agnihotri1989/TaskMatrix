// src/components/StatCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import { SHADOWS } from '../utils/shadows';
export default function StatCard({ title, value, accentColor = COLORS.primary, isHighlighted = false }) {
  return (
    <View
      style={[
        styles.card,
        isHighlighted && styles.cardHighlighted,
        { borderTopColor: accentColor } // Dynamic prop styling
      ]}
    >
      <Text style={[styles.value, { color: accentColor }]}>
        {value}
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // Row parent mein equal space distribute karega (layout_weight="1")
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    borderTopWidth: 4, // Top accent indicator
    alignItems: 'center', // Horizontal center (Cross axis alignment)
    justifyContent: 'center', // Vertical center (Main axis alignment)
    marginHorizontal: 4, // Cards ke beech ka gap
    ...SHADOWS.small, // Subtle shadow effect
  },
  cardHighlighted: {
    backgroundColor: '#1E293B', // Subtle highlight state
    borderColor: COLORS.primary,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});