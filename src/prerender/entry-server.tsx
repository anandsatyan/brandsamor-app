import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../AppRoutes';

export const renderRoute = (url: string) =>
  renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <AppRoutes />
      </MemoryRouter>
    </StrictMode>,
  );
