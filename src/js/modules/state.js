let tasks = []

// Геттер, который возвращает массив существующих задач.
export const getTasks = () => {
  return tasks
}

// Сеттер, обновляет массив
export const setTasks = (newTasks) => {
  tasks = newTasks;
};
