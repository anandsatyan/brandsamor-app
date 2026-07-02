import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { GoogleAnalytics } from './components/GoogleAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <AppRoutes />
    </BrowserRouter>
  );
}
