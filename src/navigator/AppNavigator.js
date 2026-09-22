import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import { useTodos } from '../hooks/useTodos';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const todoData = useTodos(); // Single Source of Truth
    const insets = useSafeAreaInsets(); // { top, bottom, left, right }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Default top navigation bar hide karne ke liye
        tabBarVariant: 'uikit', // Force iOS style tabs on Android to remove the material active indicator (card shape)
        tabBarActiveTintColor: COLORS.primary, // Active tab ka highlight color (#6366F1)
        tabBarInactiveTintColor: COLORS.textMuted, // Inactive tab ka grey color
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.surfaceBorder,
          borderTopWidth: 1,
          // Base height 60 + hardware gesture bar inset
          height: 60 + insets.bottom,
          // Agar gesture bar hai toh uske mutabiq padding, warna normal 8
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-done-circle' : 'checkmark-done-circle-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
     <Tab.Screen name="Tasks">
        {(props) => <HomeScreen {...props} todoData={todoData} />}
      </Tab.Screen>
      <Tab.Screen name="Analytics">
        {(props) => <AnalyticsScreen {...props} todos={todoData.todos} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}