import { useMemo } from 'react';
import { CATEGORIES } from '../utils/constants';

export const useAnalytics = (todos = []) => {
  const analytics = useMemo(() => {
    // Step 1: Overall stats calculate karein
    const totalTodos = todos.length;
    const completedTodos = todos.filter(t => t.isCompleted).length;
    const pendingTodos = totalTodos - completedTodos;

    // Zero-division check (Android mein ArithmeticException ya NaN se bachne ke liye)
    const completionRate = totalTodos > 0 
      ? Math.round((completedTodos / totalTodos) * 100) 
      : 0;

    // Step 2: Category-wise breakdown
    // CATEGORIES mein 'All' bhi hai, use filter karke hata dein
    const categoryBreakdown = CATEGORIES
      .filter(category => category !== 'All')
      .map(category => {
        const categoryTasks = todos.filter(t => t.category === category);
        const total = categoryTasks.length;
        const completed = categoryTasks.filter(t => t.isCompleted).length;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return {
          category,
          total,
          completed,
          rate,
        };
      });

    // Step 3: Memoized result return karein
    return {
      totalTodos,
      completedTodos,
      pendingTodos,
      completionRate,
      categoryBreakdown,
    };
  }, [todos]); // Dependency array: Sirf tab recalculate hoga jab todos change honge!

  return analytics;
};