import { useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const useUpdateDoc = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const db = getFirestore();

    const updateDocument = async (docPath: any, params: any) => {
        setIsUpdating(true);
        setError(null);
        setSuccess(false);

        try {
            console.log({ docPath })
            const docRef = doc(db, docPath);
            await updateDoc(docRef, params);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return { isUpdating, error, success, updateDocument };
};

export default useUpdateDoc;
