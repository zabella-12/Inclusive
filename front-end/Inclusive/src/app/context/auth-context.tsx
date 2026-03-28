import { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'employee' | 'company' | null;

interface User {
  name: string;
  email: string;
  type: UserType;
  department?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  userType: UserType;
  login: (email: string, password: string, type: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);

  const login = (email: string, password: string, type: UserType) => {
    // Mock login - em produção, isso faria uma chamada à API
    if (type === 'employee') {
      setUser({
        name: 'Pedro Henrique Silva',
        email: email,
        type: 'employee',
        department: 'Tecnologia',
        role: 'Analista de Sistemas Pleno',
      });
    } else {
      setUser({
        name: 'Administrador RH',
        email: email,
        type: 'company',
        department: 'Recursos Humanos',
        role: 'Gestor',
      });
    }
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
