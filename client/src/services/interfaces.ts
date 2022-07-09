export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber?: string;
}

export interface RegisterResponse {
  token: string;
}

export interface UpdateUserProps {
  name: string;
  email: string;
  password: string;
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  }
  phoneNumber?: string;
}

export interface UpdateUserResponse {
  message: string;
}

export interface DeleteUserResponse {
  message: string;
}