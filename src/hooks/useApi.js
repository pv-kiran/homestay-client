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

  const executeBlob = useCallback(
    async (...params) => {
      try {
          setLoading(true);
          setError(null);
          const response = await apiFunc(...params);
          // Don't destructure for blob responses
          if (response?.headers?.['content-type']?.includes('application/pdf')) {
              setSuccess(true);
              return response;  // Return full response for blobs
          }
          // For regular JSON responses
          setData(response.data);
          setSuccess(true);
          return response;
      } catch (err) {
          setError(err?.response?.data || "An error occurred");
          setSuccess(false);
          throw err;  // Propagate the error instead of returning false
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
    executeBlob,
  };
};

export default useApi;
