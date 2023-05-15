import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { User as UserProfile } from "@/libs/dtl/user";
import { RoutePath } from "@/utils/route";

interface AuthContextType {
  user: User | undefined | null;
  userProfile: UserProfile | undefined | null;
  loading: boolean | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  userProfile: undefined,
  loading: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

const useUser = (uid: string | undefined) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let unsubscribe: any;
    if (!!uid) {
      const userRef = doc(db, "user", uid);
      unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot?.exists?.()) {
          setUser({ ...docSnapshot?.data?.(), uid: docSnapshot.id });
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
    } else {
      console.log("Estas Registradooooo");
    }
  }, [user, loading, userProfile]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
