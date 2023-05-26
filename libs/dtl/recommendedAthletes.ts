
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../firebase";
import { AthleteProfile } from "@/libs/dtl/types";

export default function useGetRecommendedAthlete() {
    const [recommendedAthletes, setRecommendedAthletes] = useState<AthleteProfile[]>([]);

    useEffect(() => {
        const fetchRecommendedAthletes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "athleteProfile"));
                const athletes = querySnapshot.docs.map((doc) => doc.data()).filter((athlete) => Object.keys(athlete).length !== 0).slice(0, 6);
                setRecommendedAthletes(athletes as AthleteProfile[]);
            } catch (error) {
                console.error('Error fetching recommended athletes:', error);
            }
        };

        fetchRecommendedAthletes();
    }, []);

    return recommendedAthletes;
}
