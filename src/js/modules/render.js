import {updateStats} from "./statistics.js"
import {updateBulkActions} from "../index.js"

const taskList = document.querySelector('[data-task-list]')

/**
 *  Рендерит одну задачу в HTML-строку
 * @param {Object} task - Объект задачи
 * @returns {string} HTML-разметка задачи
 */
const renderSingleTask = (task) => {
  return `
      <li class="task-item" data-id="${task.id}" data-completed="${task.completed}" data-important="${task.important}">
        <div class="task-item__content">
          <label class="task-item__checkbox-label">
            <input type="checkbox" class="task-item__checkbox" ${task.completed ? 'checked' : ''} data-task-checkbox>
              <span class="task-item__checkmark">
                <svg class="check-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="none" stroke="white" stroke-width="3" d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <span class="task-item__text">${task.text}</span>
          </label>
        </div>
        <button class="task-item__delete" aria-label="Удалить задачу">
          <svg class="delete-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </li>
    `
}

/**
 * Основная функция рендеринга списка задач
 * @param {Array} tasksToRender - Массив задач для отображения
 */
const renderTasks = (tasksToRender) => {
  // Рендеринг списка задач
  taskList.innerHTML = tasksToRender.map(renderSingleTask).join('')

  // Обновление дополнительных элементов
  updateBulkActions(tasksToRender)
  updateStats(tasksToRender)
}

export {renderTasks}