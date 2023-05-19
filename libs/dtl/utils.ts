import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { DocumentData, Query, startAfter, query, getDocs } from "firebase/firestore";

// Test this custom hook, when implement infinite scroll
export const usePaginateQuery = (queryFn: () => Query) => {
    const [data, setData] = useState<null | DocumentData[]>(null)
    const isMountedRef = useRef(false);
    const lastItemRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [errorMsg, setErrorMsg] = useState();

    const resetStates = () => {
        setData(null);
        setData([]);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isMountedRef.current === true) return;

        async function fetchQuery() {
            try {
                isMountedRef.current = true;
                setIsLoading(true);
                const q = query(queryFn());
                const querySnapshot = await getDocs(q);
                setData([...querySnapshot.docs]);
                if (lastItemRef) {
                    lastItemRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
                }
                setIsLoading(false);
            } catch (error) {
                resetStates();
                setErrorMsg(error.code);
            }
        }
        fetchQuery();
    }, [queryFn]);

    const more = useCallback(async () => {
        try {
            setIsLoading(true);
            const next = query(queryFn(), startAfter(lastItemRef.current));
            const querySnapshot = await getDocs(next);
            setData([...data ?? [], ...querySnapshot.docs]);
            lastItemRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
            setIsLoading(false);
        } catch (error) {
            resetStates();
            setErrorMsg(error.code);
        }
    }, [data, queryFn]);

    return useMemo(
        () => ({
            more,
            isLoading,
            data,
            errorMsg,
        }),
        [more, isLoading, data, errorMsg]
    );
};