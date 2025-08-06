import { test, expect } from '@playwright/test';

test.describe('Admin Booking Management', () => {
  test('should display the booking management page', async ({ page }) => {
    await page.goto('/admin');

    // Ожидаем загрузки заголовка админ-панели
    await expect(page.locator('h2:has-text("Админ-панель")')).toBeVisible();

    // Кликаем на вкладку "Бронирования"
    await page.click('button[role="tab"]:has-text("Бронирования")');

    // Проверяем, что заголовок "Управление бронированиями" виден
    await expect(page.locator('h3:has-text("Управление бронированиями")')).toBeVisible();
  });

  test('should allow to change booking status', async ({ page }) => {
    await page.goto('/admin');

    // Кликаем на вкладку "Бронирования"
    await page.click('button[role="tab"]:has-text("Бронирования")');

    // Ожидаем появления хотя бы одного бронирования
    await expect(page.locator('[data-testid="booking-card"]').first()).toBeVisible({
      timeout: 10000,
    });

    // Находим первую карточку бронирования со статусом "Ожидает"
    const pendingBooking = page.locator('[data-testid="booking-card"]:has-text("Ожидает")').first();
    await expect(pendingBooking).toBeVisible();

    // Находим Select и кликаем на него, чтобы открыть опции
    await pendingBooking.getByTestId('booking-status-select').locator('button').click();

    // Кликаем на опцию "Подтверждено"
    await page.getByRole('option', { name: 'Подтверждено' }).click();

    // Проверяем, что статус изменился на "Подтверждено"
    await expect(pendingBooking.locator(':text("Подтверждено")')).toBeVisible();
  });
});
