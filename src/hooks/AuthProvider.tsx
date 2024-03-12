import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
export interface UserData {
  user: any;
  token: string;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      return JSON.parse(storedUserData);
    }
    return null;
  });

  // useEffect(() => {
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
