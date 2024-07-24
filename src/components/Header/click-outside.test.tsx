import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickOutside from './click-outside.component';

describe('ClickOutside Component', () => {
  const mockOnClick = jest.fn();
  const childText = 'Child Component';

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ClickOutside onClick={mockOnClick}>
        <div>{childText}</div>
      </ClickOutside>
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  it('calls onClick when clicked outside', () => {
    const { container } = render(
      <div>
        <ClickOutside onClick={mockOnClick}>
          <div>{childText}</div>
        </ClickOutside>
        <div data-testid="outside">Outside</div>
      </div>
    );

    const outsideElement = container.querySelector('[data-testid="outside"]');
    if (outsideElement) {
      fireEvent.mouseDown(outsideElement);
    }
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when clicked inside', () => {
    const { getByText } = render(
      <ClickOutside onClick={mockOnClick}>
        <div>{childText}</div>
      </ClickOutside>
    );

    fireEvent.mouseDown(getByText(childText));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('respects exceptionRef', () => {
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

    const { getByTestId } = render(<ExceptionComponent />);

    fireEvent.mouseDown(getByTestId('exception'));
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('applies className correctly', () => {
    const className = 'test-class';
    const { container } = render(
      <ClickOutside onClick={mockOnClick} className={className}>
        <div>{childText}</div>
      </ClickOutside>
    );

    expect(container.firstChild).toHaveClass(className);
  });
});
