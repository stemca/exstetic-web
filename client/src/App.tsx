import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home, Login, ResetPassword, ForgotPassword, Register } from './pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password/:id/:token' element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
