import { test, expect } from '@playwright/test';

test('Домашняя страница загружается и кнопка бронирования видима', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Бар-да-бар/);
  const bookingButton = page.getByRole('button', { name: /Забронировать столик/i });
  await bookingButton.scrollIntoViewIfNeeded();
  await expect(bookingButton).toBeVisible();
});
