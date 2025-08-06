import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '../Hero';

describe('Hero component', () => {
  it('отображает приветственный заголовок', () => {
    render(<Hero setActiveSection={() => {}} />);
    expect(screen.getByText(/Добро пожаловать/i)).toBeInTheDocument();
  });

  it('вызывает setActiveSection("menu") при клике по кнопке "Посмотреть меню"', async () => {
    const user = userEvent.setup();
    const mockSet = jest.fn();
    render(<Hero setActiveSection={mockSet} />);
    const btn = screen.getByRole('button', { name: /Посмотреть меню/i });
    await user.click(btn);
    expect(mockSet).toHaveBeenCalledWith('menu');
  });
});
