import { getTasks, setTasks } from "./modules/state.js"
import { initBulkAction } from "./modules/bulk-actions.js"
import { initTaskFilter } from "./modules/filters.js"
import { initSortTasks } from "./modules/sort.js"
import {renderTasks} from "./modules/render.js"
import "./modules/theme-toggle.js"

const taskInput = document.querySelector('[data-task-input]')
const addTaskBtn = document.querySelector('[data-task-action="add"]')
const taskList = document.querySelector('[data-task-list]')

const tasksCount = document.querySelector('[data-task-count]')
const completedCount = document.querySelector('[data-completed-count]')

const completeAllBtn = document.querySelector('[data-mark-completed]')
const unCompleteAllBtn = document.querySelector('[data-unMark-completed]')

const DELETE_DURATION = 300; // ms

initBulkAction(renderTasks)
initTaskFilter()
initSortTasks()

/**
 * Обновляет состояние кнопок массового редактирования
 * @param {Array} tasksArray - Массив задач для проверки
 */
export const updateBulkActions = (tasksArray) => {
  // ? Отметить/Снять все
  const allCompleted = tasksArray.every(task => task.completed);
  const allUncompleted = tasksArray.every(task => !task.completed);

  completeAllBtn.disabled = allCompleted;
  unCompleteAllBtn.disabled = allUncompleted;
}


// -------------------------------
// Добавление задачи
// -------------------------------

/**
 * Добавляет новую задачу в список.
 * @param {string} taskText - Текст задачи
 * @returns {boolean} Успешность операции
 */
const addTask = (taskText) => {
  const currentTasks = getTasks(); // 1. Получаем текущий список задач

  if (!taskText.trim()) return // 2. Проверяем, что текст задачи не пустой

  // 3. Создаём новую задачу
  const newTask = {
    text: taskText, // Текст из поля ввода
    id: Math.max(0, ...currentTasks.map(t => t.id)) + 1, // Генерируем ID
    completed: false, // По умолчанию задача не выполнена
    date: new Date().toISOString(), // Текущая дата в формате строки
  }

  // console.log('newTask:', newTask); // Что мы создали?
  // console.log('updatedTasks:', updatedTasks); // Что сохраняем?

  // 4. Обновляем массив задач:
  // - Добавляем новую задачу в начало массива
  // - Разворачиваем старые задачи через spread (...currentTasks)
  const updatedTasks = [newTask, ...currentTasks]

  // 5. Сохраняем обновлённый массив в state
  setTasks(updatedTasks)

  // 6. Очищаем поле ввода
  taskInput.value = ""

  // 7. Перерисовываем список
  renderTasks(updatedTasks)
}

// Добавление новой задачи c помощью кнопки
const handleAddTaskClick = () => addTask(taskInput.value)
// Добавление новой задачи c помощью Enter
const handleAddTaskEnter = (event) => {
  if (event.key === 'Enter') addTask(taskInput.value)
}

addTaskBtn.addEventListener('click', handleAddTaskClick)
taskInput.addEventListener('keydown', handleAddTaskEnter)

// -------------------------------
// Удаление задачи
// -------------------------------

/**
 * Удаляет задачу с анимацией.
 * @param {number} id - ID задачи.
 * @param {HTMLElement} taskElement - DOM-элемент задачи.
 */
const deleteTask = (id, taskElement) => {
  // 1. Получаем текущий список задач
  const currentTasks = getTasks()

  // 2. Запускаем анимацию удаления
  if (!taskElement) return
  taskElement.classList.add('fade-out')

  // 3. Через 300 мс (после завершения анимации):
  setTimeout(() => {
    // 4. Фильтруем массив задач, оставляя все, кроме удаляемой
    const newTasks = currentTasks.filter((task) => task.id !== id)
    // 5. Сохраняем обновлённый массив в state
    setTasks(newTasks)
    // 6. Перерисовываем список задач на странице
    renderTasks(newTasks)
  }, DELETE_DURATION) // Ждём 300 мс (длительность анимации)
}

// ? Находим задачу, которую нужно удалить и её id 
taskList.addEventListener('click', (event) => {
  // Проверяем, что кликнули именно по кнопке удаления
  const deleteButton = event.target.closest('.task-item__delete')
  if (!deleteButton) return

  const taskElement = event.target.closest('.task-item')
  const taskId = Number(taskElement.dataset.id)

  deleteTask(taskId, taskElement)
})

// -------------------------------
// Смена статуса задачи
// ------------------------------

// ? сменить статус задачи и обновить список
taskList.addEventListener('click', (event) => {
  if (!event.target.classList.contains('task-item__checkbox')) return
  // Получаем текущие задачи из хранилища
  const currentTasks = getTasks()  

  // Находим ID задачи, которую нужно изменить
  const taskItemId = Number(event.target.closest('.task-item').dataset.id)
  // Находим саму задачу и меняем её статус
  const taskToUpdate = currentTasks.find((task) => task.id === taskItemId)
  taskToUpdate.completed = !taskToUpdate.completed

  // Сохраняем обновлённый список задач в хранилище
  setTasks(currentTasks)
  // Перерисовываем список с обновлёнными данными
  renderTasks(currentTasks)
})






