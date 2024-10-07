import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './loader.component';

describe('Loader Component', () => {
  test('Should render correctly', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader');
    const spinnerElement = loaderElement.querySelector('div.animate-spin');

    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('flex h-screen items-center justify-center bg-white dark:bg-dark');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent');
  });
});
