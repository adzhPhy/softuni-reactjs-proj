import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// login function
const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });
// logout function
export const handleSignout = async (event) => {
  event.preventDefault();
  const { error } = await supabase.auth.signOut();
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
