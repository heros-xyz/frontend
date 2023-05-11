import React, { use, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/libs/firebase";
import { RoutePath } from "@/utils/route";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

const useUser = (uid: string | undefined) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe: any;
    if (!!uid) {
      const userRef = doc(db, "user", uid);
      unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot?.exists?.()) {
          setUser({ ...docSnapshot?.data?.(), uid });
        }
      });
    }

    return () => {
      unsubscribe?.();
    };
  }, [uid]);

  return user;
};

// TODO: type this
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, loading, error] = useAuthState(auth);
  const userProfile = useUser(user?.uid);

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
      // redirect to his page
      console.log("Estas Registradooooo");
    }
  }, [user, loading, userProfile]);

  return (
    <AuthContext.Provider value={{ user, userProfile }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
