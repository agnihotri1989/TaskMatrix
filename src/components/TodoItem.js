// src/components/TodoItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import { SHADOWS } from '../utils/shadows';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={[styles.container, todo.isCompleted && styles.containerCompleted]}>
      {/* 1. Toggle Checkbox */}
      <TouchableOpacity 
        style={[styles.checkbox, todo.isCompleted && styles.checkboxCompleted]} 
        onPress={() => onToggle && onToggle(todo.id)}
        activeOpacity={0.7}
      >
        {todo.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* 2. Todo Title */}
      <View style={styles.textContainer}>
        <Text 
          style={[styles.title, todo.isCompleted && styles.titleCompleted]}
          numberOfLines={2}
        >
          {todo.title}
        </Text>
      </View>

      {/* 3. Category Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{todo.category}</Text>
      </View>

      {/* 4. Delete Action Button */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDelete && onDelete(todo.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    ...SHADOWS.small, // Subtle shadow effect
  },
  containerCompleted: {
    opacity: 0.6,
    borderColor: 'transparent',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: COLORS.surfaceBorder,
    marginRight: 10,
  },
  badgeText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  deleteButton: {
    padding: 6,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});