'use client';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react';

interface IAuthContext {
  user: IUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface IUser {
  name: string;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  // Simulate an authentication process
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data from your API
      setUser({ name: 'John Doe' });
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Perform your login operation here
    // If successful, store the token and set the user state
    localStorage.setItem('token', 'your-token');
    setUser({ name: 'John Doe' });
  };

  const logout = () => {
    // Clear the token and user state
    localStorage.removeItem('token');
    setUser(null);
  };

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth/signin');
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
