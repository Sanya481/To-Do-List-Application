import { getTasks, setTasks } from "./state.js"

// -------------------------------
// Помечает все задачи как выполненные или невыполненные
// ------------------------------


/**
 * Помечает все задачи как выполненные или невыполненные
 * @param {boolean} completed - true для выполненных, false для невыполненных
 */
const markAllTasks = (completed, renderFunction) => {
  const currentTasks = getTasks()  // 1. Достаём текущие задачи

  if (currentTasks.length === 0) return

  const updatedTasks = currentTasks.map((task) => ({
    ...task, // Копируем все свойства задачи
    completed: completed // Меняем только статус
  }))

  setTasks(updatedTasks)
  // updateBulkActions(updatedTasks)
  renderFunction(updatedTasks)
}

// Инициализация кнопок
const initBulkAction = (renderFunction) => {
  const completeAllBtn = document.querySelector('[data-mark-completed]')
  const unCompleteAllBtn = document.querySelector('[data-unMark-completed]')

  // Отмечаем все задачи выполненными
  completeAllBtn.addEventListener('click', () => markAllTasks(true, renderFunction))
  // Отмечаем все задачи НЕ выполненными
  unCompleteAllBtn.addEventListener('click', () => markAllTasks(false, renderFunction))
}



export { initBulkAction }