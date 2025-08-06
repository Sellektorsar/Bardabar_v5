import { test, expect } from '@playwright/test';

test('Форма бронирования показывает ошибку при незаполненных обязательных полях', async ({
  page,
}) => {
  // Открываем домашнюю страницу
  await page.goto('/');

  // Переходим к форме бронирования столика
  const bookingButton = page.getByRole('button', { name: /Забронировать столик/i }).first();
  await bookingButton.click();

  // Ожидаем появления формы «Бронирование столика»
  const bookingFormHeader = page.locator('text=Бронирование столика').first();
  await expect(bookingFormHeader).toBeVisible();
  await bookingFormHeader.scrollIntoViewIfNeeded();

  // Находим кнопку отправки формы бронирования по её тексту внутри любой формы
  const submitButton = page.locator('form button:has-text("Забронировать столик")').first();
  await submitButton.scrollIntoViewIfNeeded();
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  // Проверяем, что появляется сообщение об обязательных полях
  await expect(page.getByText('Пожалуйста, заполните все обязательные поля')).toBeVisible();
});
