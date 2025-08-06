import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

describe('Header component', () => {
  // Вспомогательная функция для рендера компонента с мок-функциями
  const renderHeader = (active: string = 'home', admin: boolean = false) => {
    const setActive = jest.fn();
    const setAdmin = jest.fn();

    render(
      <Header
        activeSection={active}
        setActiveSection={setActive}
        isAdminMode={admin}
        setIsAdminMode={setAdmin}
      />,
    );

    return { setActive, setAdmin };
  };

  it('отображает название кафе', () => {
    renderHeader();
    expect(screen.getByText(/Бар-да-бар/i)).toBeInTheDocument();
  });

  it('переключает раздел при клике по пункту меню', async () => {
    const user = userEvent.setup();
    const { setActive } = renderHeader();
    const menuBtn = screen.getByRole('button', { name: /Меню/i });
    await user.click(menuBtn);
    expect(setActive).toHaveBeenCalledWith('menu');
  });

  it('вызывает setIsAdminMode при клике по кнопке Админ', async () => {
    const user = userEvent.setup();
    const { setAdmin } = renderHeader();
    const adminBtn = screen.getByRole('button', { name: /Админ/i });
    await user.click(adminBtn);
    expect(setAdmin).toHaveBeenCalled();
  });
});
