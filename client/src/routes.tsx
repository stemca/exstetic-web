import { useRoutes } from 'react-router-dom';
import { Home, Login, ResetPassword, ForgotPassword, Register } from './pages';

export default function Router() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    { path: 'login', element: <Login /> },
  ]);

  return element;
}
