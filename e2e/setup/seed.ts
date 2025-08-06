import { createClient } from '@supabase/supabase-js';

async function seed() {
  const supabaseUrl = 'http://127.0.0.1:54321';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'; // Default local service_role key

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Удаляем все существующие бронирования, чтобы каждый раз начинать с чистого листа
  const { error: deleteError } = await supabase
    .from('table_bookings')
    .delete()
    .not('id', 'is', null);

  if (deleteError) {
    const errorMessage = `Ошибка при удалении тестовых данных: ${JSON.stringify(deleteError, null, 2)}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Добавляем новое тестовое бронирование
  const { error } = await supabase.from('table_bookings').insert([
    {
      name: 'Тестовый Пользователь',
      phone: '+79998887766',
      email: 'test@example.com',
      date: new Date().toISOString(),
      time: '19:00',
      guests: 2,
      status: 'pending',
      specialRequests: 'Тестовый комментарий',
    },
  ]);

  if (error) {
    const errorMessage = `Ошибка при добавлении тестовых данных: ${JSON.stringify(error, null, 2)}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  console.log('Тестовые данные успешно добавлены.');
}

export default seed;
