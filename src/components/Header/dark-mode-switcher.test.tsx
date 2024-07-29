import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import DarkModeSwitcher from './dark-mode-switcher.component';
describe('DarkModeSwitcher Component', () => {
  beforeEach(() => {
    render(<DarkModeSwitcher />);
  });

  it('renders the DarkModeSwitcher button', () => {
    expect(screen.getByTestId('dark-mode-switcher-button')).toBeInTheDocument();
  });

  it('displays sun and moon icons', () => {
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('toggles color mode when clicked', () => {
    const switcher = screen.getByTestId('dark-mode-switcher-button');
    fireEvent.click(switcher);
    const switcherSlider = screen.getByTestId('dark-mode-switcher-slider');

    expect(switcherSlider).toHaveClass('translate-x-[51px]');
  });
});
