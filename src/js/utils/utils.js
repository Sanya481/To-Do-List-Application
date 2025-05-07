/**
 * Универсальная функция для склонения слов
 * @param {number} count - количесвто
 * @param {array} words - три слова в разных склонениях 
 */
export const pluralize = (count, words) => {
  if (!words || words.length < 3) {
    return console.log('мало слов');
  }

  const lastTwoDigit = Math.abs(count % 100); // Последнее 2 числа + Учитываем отрицательные числа  
  const lastDigit = Math.abs(count % 10); // Последнее число 

  // Сначала проверяем исключения (11-19)
  if (lastTwoDigit >= 11 && lastTwoDigit <= 19) {
    return words[2] // Всегда 3-я форма
  }

  switch (lastDigit) {
    case 1:
      return words[0] // "задача"     
    case 2:
    case 3:
    case 4:
      return words[1] // "задачи"      
    default:
      return words[2] // "задач" (0,5-9)
  }
}
// * В русском языке окончание зависит от последней цифры числа (кроме исключений 11-19):
// * Последняя цифра	Пример числа	Склонение
// * 1	              1, 21,31	      задача
// * 2-4	            2, 23, 44	      задачи
// * 5-9,             0	5, 10, 28	    задач

/**
 * Функция для склонения слова "задача" в зависимости от числа
 * @param {number} count - количество задач
 * @returns {string} - правильная форма слова
 */
// const getTaskWord = (count) => {
//   const lastDigit = count % 10 // % 10 — всегда даёт последнюю цифру
//   const lastTwoDigits = count % 100 // % 100 — даёт две последние цифры

//   if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "задач"

//   if (lastDigit === 1) return "задача"
//   if (lastDigit >= 2 && lastDigit <= 4) return "задачи"
//   return 'задач'
// }

// export let nextId = Math.max(0, ...array.map(t => t.id)) + 1; // Начинаем с 1























