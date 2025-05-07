// -------------------------------
// Смена темы 
// -------------------------------

const themeToggle = document.querySelector('[data-theme-toggle]')
const body = document.body


document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme')

  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme)

  } else {
    // определяем системную тему через prefers-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;    
    const systemTheme = prefersDark ? 'dark' : 'light'
    body.setAttribute('data-theme', systemTheme)
  }

  themeToggle.checked = body.dataset.theme === 'dark'
})


/**
 * Функцию для переключения темы
 */
const toggleTheme = () => {
  const currentTheme = body.dataset.theme || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'

  body.setAttribute('data-theme', newTheme)
  themeToggle.checked = newTheme === 'dark'

  try {
    localStorage.setItem('theme', newTheme)
  } catch (e) {
    console.log('Не удалось сохранить тему', e);
  }
}

themeToggle.addEventListener('change', toggleTheme)