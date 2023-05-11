import { query, collection, where, getCountFromServer } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { db } from "../firebase";

export function useGetCareerJourneyCount() {
    const { user } = useAuthContext()
    const [count, setCount] = useState(0);

    useEffect(() => {
        const q = query(
            collection(db, "careerJourneys"),
            where("uid", "==", user.uid)
        );
        getCountFromServer(q)
            .then((snapshot) => setCount(snapshot?.data().count))
            .catch(console.error);

    }, [user]);

    return count
}