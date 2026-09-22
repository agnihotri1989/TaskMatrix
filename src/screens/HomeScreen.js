import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { COLORS } from '../utils/constants';
import StatCard from '../components/StatCard';
import { TodoInput } from '../components/TodoInput';
import { TodoItem } from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({todoData}) {
     const defaultTodoData = useTodos();
  const {
    todos,
    filteredTodos,
    selectedCategory,
    isLoading,
    setSelectedCategory,
    totalCount,
    completedCount,
    pendingCount,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = todoData || defaultTodoData;

  const appName = "TaskMatrix";
  const subtitle = "Smart Todo & Local Analytics";

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <KeyboardAvoidingView 
    style={styles.keyboardContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
     

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <StatCard title="Total" value={totalCount} accentColor={COLORS.primary} />
        <StatCard
          title="Completed"
          value={completedCount}
          accentColor={COLORS.success}
          isHighlighted={true}
        />
        <StatCard title="Pending" value={pendingCount} accentColor={COLORS.warning} />
      </View>

      {/* Todo Input */}
      <TodoInput onAddTask={(task) => addTodo(task.title, task.category)} />

      {/* List Section Header */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Tasks</Text>
        <Text style={styles.taskCountText}>{todos.length} items</Text>
      </View>

      {/* List / Loading Section */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptySubtitle}>
                Add your first task using the input above!
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"    
        />
      )}
  </KeyboardAvoidingView>
     
    
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
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  taskCountText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 40,
  },
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: COLORS.textMuted,
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  keyboardContainer: {
  flex: 1,
},
});