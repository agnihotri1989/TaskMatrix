import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS } from '../utils/constants';
import { SHADOWS } from '../utils/shadows';

const CATEGORIES = ['Work', 'Personal', 'Health'];

export const TodoInput = ({ onAddTask }) => {
 const [taskTitle, setTaskTitle] = useState('');
const [selectedCategory, setSelectedCategory] = useState('Work');   

  const handleAdd = () => {
    if (!taskTitle.trim()) return;
   if (onAddTask) {
  onAddTask({
    title: taskTitle.trim(),
    category: selectedCategory,
  });
  setTaskTitle('');
}
  };

  return (
    <View style={styles.container}>
      {/* Category Chips Selector */}
      <View style={styles.chipRow}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Input + Button Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          placeholderTextColor="#94A3B8"
          value={taskTitle}
          onChangeText={setTaskTitle}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginTop: 20,
    ...SHADOWS.medium
  },
  chipRow: {
    flexDirection: 'row',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceBorder,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: COLORS.background, // Dark text on primary colored chip
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  input: {
    flex: 1,
    height: 44,
    borderColor: COLORS.surfaceBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
    android: {
      elevation: 3, // Android Material touch target feel
    },
    ios: {
      shadowColor: COLORS.primary, // iOS primary glow effect
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  }),
  },
  addButtonText: {
    color: COLORS.background, // Dark text for sharp contrast on sky blue button
    fontWeight: 'bold',
    fontSize: 14,
  },
});