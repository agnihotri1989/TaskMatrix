import AsyncStorage from "@react-native-async-storage/async-storage";

const TODOS_STORAGE_KEY = '@taskmatrix_todos';

export const saveTodos = async (todos) => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_STORAGE_KEY, jsonValue);
    return true;
  } catch (error) {
    console.error('[AsyncStorage] Error saving todos:', error);
    return false;
  }
};

export const loadTodos = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('[AsyncStorage] Error loading todos:', error);
    return [];
  }
};

export const clearTodos = async () => {
  try {
    await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('[AsyncStorage] Error clearing todos:', error);
    return false;
  }
};