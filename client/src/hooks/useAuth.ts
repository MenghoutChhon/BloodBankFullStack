import { useAuthContext, User, UserRole } from '../contexts/AuthContext';

// Optionally, define a type for the signIn argument
type SignInInput = {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
};

export const useAuth = () => {
  const { user, login, logout } = useAuthContext();

  // signIn now requires role (and optionally name)
  const signIn = (userData: SignInInput) => {
    login(userData, "fake-token"); // This will also update localStorage via AuthContext
  };

  const signOut = () => {
    logout(); // This will clear context and localStorage
  };

  // For reloading user from localStorage (normally handled in AuthContext)
  const loadUser = () => {
    const storedUser = localStorage.getItem('bloodbank_user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        login(parsedUser, "fake-token");
      } catch (e) {
        // Optionally handle error/corrupt data
        logout();
      }
    }
  };

  return { user, signIn, signOut, loadUser };
};
