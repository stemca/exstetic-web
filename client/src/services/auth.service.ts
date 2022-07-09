import axios from 'axios';
import {
  DeleteUserResponse,
  LoginProps,
  LoginResponse,
  RegisterProps,
  RegisterResponse,
  UpdateUserProps,
  UpdateUserResponse,
} from './interfaces';
const API_URL = 'http://localhost:3001';

// POST api/auth/register
// prettier-ignore
async function register(user: RegisterProps): Promise<RegisterResponse | string> {
  try {
    const { data } = await axios.post<RegisterResponse>(
      `${API_URL}/api/auth/register`,
      { user }
    );
    console.log(JSON.stringify(data, null, 4));
    return data;
  } catch (error) {
    // error: AxiosError<any, any>
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// POST api/auth/login
// prettier-ignore
async function login(user: LoginProps): Promise<string | LoginResponse> {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${API_URL}/api/auth/login`,
      { user }
    );
    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    // error: AxiosError<any, any>
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// PATCH api/auth/update-user/:id
// prettier-ignore
async function updateUser(user: UpdateUserProps, id: string): Promise<UpdateUserResponse | string> {
  try {
    const { data } = await axios.patch<UpdateUserResponse>(
      `${API_URL}/api/auth/update-user${id}`, 
      { user }
    );
    console.log(JSON.stringify(data, null, 4));
    return data;
  } catch (error) {
     // error: AxiosError<any, any>
     if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// DELETE api/auth/delete-user/:id
async function deleteUser(id: string): Promise<string | DeleteUserResponse> {
  try {
    const { data } = await axios.delete<DeleteUserResponse>(
      `${API_URL}/api/auth/delete-user/${id}`
    );
    console.log(data, null, 4);
    return data;
  } catch (error) {
    // error: AxiosError<any, any>
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

const AuthService = {
  login,
  register,
  updateUser,
  deleteUser,
};

export default AuthService;
