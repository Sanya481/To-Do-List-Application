import { getTasks, setTasks } from "./state.js";
import { renderTasks } from "./render.js";

// // -------------------------------
// Сортировка по дате, алфавиту
// -------------------------------


// Сортировка по дате, алфавиту
const taskSort = document.querySelector('[data-task-sort]')
const dataSortDropdown = taskSort.querySelector('[data-sort-dropdown]')
const sortBtn = taskSort.querySelector('[data-sort-btn]')

// Общие свойства для закрытия
const closeDropdown = () => {
  dataSortDropdown.classList.remove('visible');
  sortBtn.setAttribute('aria-expanded', 'false')
  sortBtn.focus()

  // Удаляем обработчик после закрытия
  document.removeEventListener('click', handleClickOutsideDropdown)
  document.removeEventListener('keydown', onEscClickDropdown)
}

// Закрытие по клику вне выпадашки
const handleClickOutsideDropdown = (event) => {
  if (!sortBtn || !dataSortDropdown) return

  const isClickInside = !sortBtn.contains(event.target) && !dataSortDropdown.contains(event.target)

  if (isClickInside && dataSortDropdown.classList.contains('visible')) {
    closeDropdown()
  }
}

// Закрытие по ESC
const onEscClickDropdown = (event) => {
  if (!dataSortDropdown.classList.contains('visible')) return

  if (event.key !== 'Escape' || event.keyCode !== 27) return
  closeDropdown()
}

// Применение сортировки
const applySortOption = (optionElement) => {
  const typeSort = optionElement.dataset.sort

  const currentTasks = getTasks()// Берём исходные задачи
  // Создаем копию массива, чтобы не мутировать исходные данные

  console.log("До сортировки:", getTasks());
  const sortedTasks = [...currentTasks]

  switch (typeSort) {
    case 'date-asc': // Новые сначала
      sortedTasks.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'date-desc': // Старые сначала
      sortedTasks.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'text-asc': // А-Я
      sortedTasks.sort((a, b) => a.text.localeCompare(b.text,
        undefined,  // Определяет язык для сортировки (например 'ru' для русского)
        {
          sensitivity: "base", //  игнорирует регистр и акценты (á = a = A)
          careFirst: "false" // Определяет порядок заглавных букв - порядок не определён
        }))
      break
    case 'text-desc': // Я-А
      sortedTasks.sort((a, b) => b.text.toLowerCase().localeCompare(a.text.toLowerCase()))
      break
  }

  console.log("После сортировки:", sortedTasks);
  setTasks(sortedTasks) // Сохраняем отсортированный массив
  renderTasks(sortedTasks) // Рендерим отсортированный список
}

// ограничение навигацию с клавиатуры внутри выпадающего списка сортировки
const handleTabNavigation = (event) => {
  if (event.key === "Tab") {
    const sortOptions = dataSortDropdown.querySelectorAll('[data-sort-option]')
    const firstElement = sortOptions[0]
    const lastElement = sortOptions[sortOptions.length - 1]

    // Если Tab на последнем элементе - переходим на первый
    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus()
    }
    // Если Shift+Tab на первом элементе - переходим на последний
    else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus()
    }
  }
}


const initSortTasks = () => {
  if (!taskSort || !dataSortDropdown || !sortBtn) return

  taskSort.addEventListener('click', (event) => {
    const clickedOption = event.target.closest('[data-sort-option]')

    // клик не по кнопке - выход из функции
    if (!sortBtn.contains(event.target) && !clickedOption) return

    dataSortDropdown.addEventListener('keydown', handleTabNavigation)

    // смена значения aria-expanded у кнопки для скринридеров
    // const isExpanded = sortBtn.getAttribute('aria-expanded') === 'true';
    // sortBtn.setAttribute('aria-expanded', (!isExpanded).toString());
    // альтернативный вариант проверки

    const isExpanded = dataSortDropdown.classList.toggle('visible');
    sortBtn.setAttribute('aria-expanded', isExpanded.toString()); // ✅ Явное управление

    // setTimeout(() => firstOption.focus(), 200) // Задержка = длительность анимации  

    // сортировка
    if (clickedOption) {
      applySortOption(clickedOption)

      const sortOption = event.target.closest('[data-sort-option]')
      const sortOptionText = sortOption.querySelector('[data-option-text]')

      const sortBtnTExt = sortBtn.querySelector('[data-sort-btn-text]')
      sortBtnTExt.textContent = sortOptionText.textContent
    }

    document.addEventListener('click', handleClickOutsideDropdown)
    document.addEventListener('keydown', onEscClickDropdown)
  })
}

export { initSortTasks }