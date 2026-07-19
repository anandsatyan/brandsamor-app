import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './account/AuthContext';
import { AppRoutes } from './AppRoutes';
import { GoogleAnalytics } from './components/GoogleAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleAnalytics />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
