// src/hooks/useTodos.js
import { useState, useEffect } from 'react';
import { loadTodos, saveTodos } from '../storage/asyncStorage';

const INITIAL_TODOS = [
  { id: '1', title: 'Complete React Native Block 4', category: 'Work', isCompleted: false },
  { id: '2', title: 'Morning 5km Jog', category: 'Health', isCompleted: true },
  { id: '3', title: 'Read Jetpack Compose to RN migration docs', category: 'Personal', isCompleted: false },
  { id: '4', title: 'Buy groceries & fruits', category: 'Personal', isCompleted: false },
  { id: '5', title: 'Drink 3L water', category: 'Health', isCompleted: true },
  { id: '6', title: 'Review pull request for auth service', category: 'Work', isCompleted: false },
];




export const useTodos = () => {
  // 1. State
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ... business logic yahan aayegi ...
 // 2. Action: Add Todo
  const addTodo = (title, category) => {
    if (!title || !title.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category || 'Work',
      isCompleted: false,
    };
    setTodos(prev => [newTodo, ...prev]);
  };
 
// 3. Action: Toggle Todo
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

// 4. Action: Delete Todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  // 5. Computed Values
  const filteredTodos = selectedCategory === 'All'
    ? todos
    : todos.filter(t => t.category === selectedCategory);
  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.isCompleted).length;
  const pendingCount = totalCount - completedCount;

  useEffect(() => {
  // 🛡️ CRITICAL GUARD: Jab tak initial loading chal rahi hai, save mat karo!
  if (isLoading) {
    return;
  }

  saveTodos(todos);
}, [todos, isLoading]);

  // 6. Side Effects
  useEffect(() => {
    const fetchTodos = async () => {
    try {
      const savedTodos = await loadTodos();
      if (savedTodos && savedTodos.length > 0) {
        setTodos(savedTodos);
      } else {
        // Agar pehli baar app khuli hai aur storage empty hai,
        // toh hum INITIAL_TODOS set kar sakte hain (optional seed data)
        setTodos(INITIAL_TODOS);
      }
    } catch (error) {
      console.error('[useTodos] Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchTodos();
  }, []);

  return {
   todos,
    filteredTodos,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    totalCount,
    completedCount,
    pendingCount,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};      