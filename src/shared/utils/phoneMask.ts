/**
 * Форматирует номер телефона в формат +7 (999) 999-99-99
 */
export const formatPhoneNumber = (value: string): string => {
  // Если значение пустое или только +7, возвращаем +7
  if (!value || value === '+7' || value === '+') {
    return '+7';
  }

  // Удаляем все нецифровые символы
  const digits = value.replace(/\D/g, '');

  // Если нет цифр, возвращаем +7
  if (digits.length === 0) {
    return '+7';
  }

  // Если начинается с 8, заменяем на 7
  let formatted = digits.startsWith('8') ? '7' + digits.slice(1) : digits;

  // Если не начинается с 7, добавляем 7 в начало
  if (!formatted.startsWith('7')) {
    formatted = '7' + formatted;
  }

  // Ограничиваем до 11 цифр (7 + 10 цифр)
  formatted = formatted.slice(0, 11);

  // Форматируем: +7 (999) 999-99-99
  if (formatted.length <= 1) {
    return `+${formatted}`;
  }

  if (formatted.length <= 4) {
    return `+7 (${formatted.slice(1)}`;
  }

  if (formatted.length <= 7) {
    return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4)}`;
  }

  if (formatted.length <= 9) {
    return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7)}`;
  }

  return `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
};

/**
 * Обрабатывает ввод в поле телефона
 */
export const handlePhoneInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  onChange: (value: string) => void
) => {
  const inputValue = e.target.value;
  const formatted = formatPhoneNumber(inputValue);
  onChange(formatted);
};

/**
 * Обрабатывает фокус на поле телефона
 */
export const handlePhoneFocus = (
  e: React.FocusEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  if (!e.target.value || e.target.value === '') {
    setValue('+7');
  }
};

