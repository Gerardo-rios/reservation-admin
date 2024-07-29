import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ClickOutside from './click-outside.component';

describe('ClickOutside Component', () => {
  const mockOnClick = jest.fn();
  const childText = 'Child Component';

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders children correctly', () => {
    render(
      <ClickOutside onClick={mockOnClick}>
        <div>{childText}</div>
      </ClickOutside>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('calls onClick when clicked outside', () => {
    render(
      <div>
        <ClickOutside onClick={mockOnClick}>
          <div>{childText}</div>
        </ClickOutside>
        <div data-testid="outside">Outside</div>
      </div>
    );

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when clicked inside', () => {
    render(
      <ClickOutside onClick={mockOnClick}>
        <div>{childText}</div>
      </ClickOutside>
    );

    fireEvent.mouseDown(screen.getByText(childText));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('respects exceptionRef and does not call onClick for exception elements', () => {
    const ExceptionComponent = () => {
      const exceptionRef = React.useRef(null);

      return (
        <div>
          <ClickOutside onClick={mockOnClick} exceptionRef={exceptionRef}>
            <div>{childText}</div>
          </ClickOutside>
          <div ref={exceptionRef} data-testid="exception">
            Exception
          </div>
        </div>
      );
    };

    render(<ExceptionComponent />);

    fireEvent.mouseDown(screen.getByTestId('exception'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies className correctly', () => {
    const className = 'test-class';
    render(
      <ClickOutside onClick={mockOnClick} className={className}>
        <div>{childText}</div>
      </ClickOutside>
    );

    expect(screen.getByText(childText).parentElement).toHaveClass(className);
  });
});
