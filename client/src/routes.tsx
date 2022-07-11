import { useRoutes, Navigate } from 'react-router-dom';
import { Home, Login, ResetPassword, ForgotPassword, Register } from './pages';

export default function Routes() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
      children: [{ path: ':id/:token', element: <ResetPassword /> }],
    },
    { path: '*', }
  ]);
}
