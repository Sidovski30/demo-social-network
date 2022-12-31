import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import MainApp from './App';

test('renders without crashing', () => {
  render(<MainApp />);
  const linkElement = screen.getByText(/profile/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders without crashing', async () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<MainApp />, div)
//   ReactDOM.unmountComponentAtNode(div);
// });

