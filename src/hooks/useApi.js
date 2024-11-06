import { useState, useCallback } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setSuccess(false);
  }, []);

  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await apiFunc(...params);
        setData(data);
        setSuccess(true);
        return data;
      } catch (err) {
        setError(err?.response?.data || "An error occurred");
        setSuccess(false);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return {
    data,
    error,
    loading,
    success,
    execute,
    reset,
  };
};

export default useApi;
