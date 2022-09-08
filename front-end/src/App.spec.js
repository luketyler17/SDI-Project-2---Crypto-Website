import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// #341028 - color of word
// #F6E6F0 -background
// #B4373D - icon color
// #703FB5 - gradient color

const setup = () => render(<App />);
describe('App Component', () => {
  beforeEach(() => {});
  it('renders logo image', () => {
    setup();
    const linkElement = screen.getByRole('img', {
      name: /cryptodex/i,
    });
    expect(linkElement).toBeInTheDocument();
  });
  it('logo image is a link', () => {
    setup();
    const linkElement = screen.getByRole('link', { name: /cryptodex/i });
    userEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument();
  });
});
