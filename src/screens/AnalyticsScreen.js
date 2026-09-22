import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLORS } from '../utils/constants';
import { useAnalytics } from '../hooks/useAnalytics';
import StatCard from '../components/StatCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsScreen({todos = []}) {

    // Humara memoized engine call karein
  const {
    totalTodos,
    completedTodos,
    pendingTodos,
    completionRate,
    categoryBreakdown,
  } = useAnalytics(todos);

   if (totalTodos === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Insights & Performance</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📊</Text>
          <Text style={styles.emptyTitle}>No Analytics Available</Text>
          <Text style={styles.emptySubtitle}>
            Add some tasks in the Tasks tab to see productivity stats!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

    return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* 1. Header — Anchored at top */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Productivity & Insights</Text>
      </View>

      {/* 2. Scrollable Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Stat Cards */}
        <View style={styles.statsRow}>
          <StatCard title="Total" value={totalTodos} accentColor={COLORS.primary} />
          <StatCard 
            title="Done" 
            value={completedTodos} 
            accentColor={COLORS.success} 
            isHighlighted={true} 
          />
          <StatCard 
            title="Rate" 
            value={`${completionRate}%`} 
            accentColor={COLORS.warning} 
          />
        </View>

        {/* Overall Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Overall Completion</Text>
            <Text style={styles.progressPercent}>{completionRate}%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${completionRate}%`, backgroundColor: COLORS.success }
              ]} 
            />
          </View>
        </View>

        {/* Category Breakdown */}
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        {categoryBreakdown.map((item) => (
          <View key={item.category} style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.categoryCount}>
                {item.completed} / {item.total} tasks ({item.rate}%)
              </Text>
            </View>

            <View style={styles.progressBarTrack}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${item.rate}%`, 
                    backgroundColor: item.rate === 100 ? COLORS.success : COLORS.primary 
                  }
                ]} 
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 24,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.success,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoryCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});