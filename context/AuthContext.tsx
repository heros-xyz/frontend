import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

// TODO: type this
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      console.log("NO ESTAS REGISTRADOOOOOO");
      router.push(RoutePath.SIGN_IN);
      // TODO: redirect to login page
    } else {
      console.log("Estas Registradooooo");
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
