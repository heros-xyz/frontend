import { useAuthContext } from "@/context/AuthContext"

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { AthleteProfile } from "./athleteProfile"
import { db } from "../firebase";

export default function useGetRecommendedAthlete() {
    const { userProfile } = useAuthContext()
    const [recommendedAthletes, setRecommendedAthletes] = useState([]);

    useEffect(() => {
        const fetchRecommendedAthletes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "athleteProfile"));
                const athletes = querySnapshot.docs.map((doc) => doc.data()).filter((athlete) => Object.keys(athlete).length !== 0).slice(0, 6);
                setRecommendedAthletes(athletes);
            } catch (error) {
                console.error('Error fetching recommended athletes:', error);
            }
        };

        fetchRecommendedAthletes();
    }, []);

    return recommendedAthletes;
}
