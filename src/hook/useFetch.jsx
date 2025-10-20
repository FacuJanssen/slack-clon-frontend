import { useState } from "react";

const useFetch = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function sendRequest(reqCallback) {
        setError(null);
        setLoading(true);
        setResponse(null);
        try {
            const data = await reqCallback();
            if (!data.ok) {
                throw new Error(data.error || data.message || "Request failed");
            }

            setResponse(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    function resetResponse() {
        setResponse(null);
    }

    return { response, loading, error, sendRequest, resetResponse };
};

export default useFetch;
