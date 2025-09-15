import { createContext, useState, useContext, useEffect } from "react";
import { fetchContracts } from "/api/contracts ";

const ContractsContext = createContext();

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        setLoading(true);
        const data = await fetchContracts();
        setContracts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadContracts();
  }, []);

  return (
    <ContractsContext.Provider value={{ contracts, loading, error }}>
      {children}
    </ContractsContext.Provider>
  );
};

export const useContracts = () => useContext(ContractsContext);
