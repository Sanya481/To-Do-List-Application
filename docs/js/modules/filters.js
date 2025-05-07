import { getTasks } from "./state.js";
import { renderTasks } from "./render.js";

// -------------------------------
// Фильтрация по выполненным и НЕ выполненным
// -------------------------------

// Получаем элементы DOM
const filterButtons = document.querySelector('[data-filter-buttons]');
const allFilterButtons = document.querySelectorAll('[data-filter-btn]')

// Переменная для хранения текущего фильтра (состояние)
let currentFilter = 'all'; // 'all' | 'active' | 'completed'


/**
 * Фильтрует задачи по указанному типу
 * @param {'all'|'active'|'completed'} filterType - Тип фильтра
 * @returns {Array} Отфильтрованный массив задач
 */
const getFilteredTasks = (filterType, tasks) => {
  let filteredTasks;

  switch (filterType) {
    case 'active':
      filteredTasks = tasks.filter((task) => !task.completed)
      break
    case 'completed':
      filteredTasks = tasks.filter((task) => task.completed)
      break
    default: // 'all'
      filteredTasks = tasks
  }

  return filteredTasks
}

/**
 * Обновляет активную кнопку фильтра
 * @param {string} activeFilter - Активный фильтр ('all' | 'active' | 'completed')
 */
const updateActiveFilterButton = (activeFilter) => {
  allFilterButtons.forEach((btn) => {
    btn.classList.toggle('filters__button--active', btn.dataset.filter === activeFilter)
  })
  // Если booleanCondition (btn.dataset.filter === currentFilter) === true - добавит класс
  // Если booleanCondition === false - удалит класс
}

const initTaskFilter = () => {
  filterButtons.addEventListener('click', (event) => {
    const filterBtn = event.target.closest('[data-filter-btn]')

    const currentTasks = getTasks()

    if (!filterBtn || currentTasks.length === 0) return

    const selectedFilter = filterBtn.dataset.filter
    if (currentFilter === selectedFilter) return // Не фильтровать повторно

    currentFilter = selectedFilter  // Обновляем текущий фильтр
    updateActiveFilterButton(currentFilter)

    renderTasks(getFilteredTasks(filterBtn.dataset.filter, currentTasks))
  })
}

export {initTaskFilter}