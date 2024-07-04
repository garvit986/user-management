export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  address: string;
  phoneNumber: string;
  role: string;
}
export interface AuthContextType {
  user: User;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
  isLoggedIn: boolean;
}
