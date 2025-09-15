import { useState, useEffect } from "react";

const useFetch = (url) => {
    // for data
  const [data, setData] = useState(null);
//   for loading
  const [loading, setLoading] = useState(true);
//   for error
  const [error, setError] = useState(null);

//   declaration of useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
