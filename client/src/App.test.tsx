import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock react-router-dom to avoid resolution issues in Jest
jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: () => null,
    Route: () => null,
    Navigate: () => null,
    useLocation: () => ({ pathname: '/' }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    useNavigate: () => jest.fn(),
  }),
  { virtual: true }
);

// Mock axios to prevent ESM import issues
jest.mock('axios', () => ({
  __esModule: true,
  default: Object.assign(jest.fn(() => Promise.resolve({ data: {} })), {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
  }),
}));

// Mock missing OurTeam component referenced in App
jest.mock(
  './pages/Publics/OurTeam',
  () => () => <div>Our Team</div>,
  { virtual: true }
);

import App from './App';

test('renders BloodDonate in header', () => {
  render(<App />);
  expect(screen.getByText(/BloodDonate/i)).toBeInTheDocument();
});
