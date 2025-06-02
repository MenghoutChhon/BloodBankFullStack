import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// User Role Type
export type UserRole = "donor" | "admin" | "hospital";

// User Interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  fullName?: string;
}

// Context Type (now includes setUser! and token)
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Context Initialization
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using Auth Context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Alias for convenience
export const useAuth = useAuthContext;

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("bloodbank_user");
    const tokenStr = localStorage.getItem("bloodbank_token");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        localStorage.removeItem("bloodbank_user");
      }
    }
    if (tokenStr) {
      setToken(tokenStr);
    }
  }, []);

  // Login method: store both user and token
  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("bloodbank_user", JSON.stringify(userData));
    localStorage.setItem("bloodbank_token", tokenData);
  };

  // Logout method: remove both
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bloodbank_user");
    localStorage.removeItem("bloodbank_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        setUser,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
