import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutesServer } from '../AppRoutes.server';

export const renderRoute = (url: string) =>
  renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <AppRoutesServer />
      </MemoryRouter>
    </StrictMode>,
  );
