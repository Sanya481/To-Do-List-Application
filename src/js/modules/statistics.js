import { pluralize } from "../utils/utils.js"
import {getTasks} from "./state.js"

/**
 * Обновляет блок статистики
 * @param {Array} tasksArray - Массив задач для отображения
 */
const updateStats = (tasksArray) => {
  // Подсчёт общего кол-ва задач и выполненных задач
  const completedTask = tasksArray.filter((task) => task.completed)

  // Анимация при изменении кол-ва задач
  const statsElement = document.querySelector('[data-stats]')
  statsElement.classList.add('updated')
  setTimeout(() => statsElement.classList.remove('updated'), 300)

  // Используем функцию склонения
  statsElement.innerHTML = `
  <span data-task-count>${tasksArray.length}</span> ${pluralize(tasksArray.length, ['задача', 'задачи', 'задач'])} всего |
  <span data-completed-count>${completedTask.length}</span> выполнено
`
}

export {updateStats}