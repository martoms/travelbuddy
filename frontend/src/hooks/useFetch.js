import { useState, useContext, useEffect } from "react";
import { AllContext } from "../context/AllContext";

const useFetch = (url, action) => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { dispatch, tourPackages, allUsers, destinations } = useContext(AllContext);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const abortCont = new AbortController();
        
        fetch(url, {
            headers: {'Authorization': `Bearer ${token}`}
        }).then(res => {
                if (!res.ok) {
                    throw Error('There seems to be a problem fetching data.');
                } else {
                    return res.json();
                };  
            })
            .then(data => {
                setIsPending(false);
                setError(null);
                dispatch({ type: action, payload: data });
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            })

        return () => abortCont.abort();

    }, [url, tourPackages, allUsers, destinations]);

    return { isPending, error };
}
 
export default useFetch;
