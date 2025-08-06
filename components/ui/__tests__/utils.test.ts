import { cn } from '../utils';

describe('cn utility', () => {
  it('объединяет классы корректно', () => {
    expect(cn('a', undefined, null, 'b')).toBe('a b');
  });
});
