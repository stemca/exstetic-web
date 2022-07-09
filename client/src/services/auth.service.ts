import axios from 'axios';

const API_URL = 'https://localhost:3001';

interface LoginProps {
  email: string;
  password: string;
}

// POST api/auth/login
async function Login(user: LoginProps) {
  try {
    const data = await axios.post(`${API_URL}/api/auth/login`);
  } catch (error) {}
}
