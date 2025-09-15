import { useContracts } from "../context/ContractsContext";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const ContractsTable = () => {
  const { contracts, loading, error } = useContracts();

  if (loading) return <p>Loading contracts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (contracts.length === 0) return <p>No contracts yet</p>;

  return (
    <div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Parties</th>
            <th className="p-2 border">Expiry</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Risk</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <Link to={`/contracts/${c.id}`} className="text-blue-600">
                  {c.name}
                </Link>
              </td>
              <td className="p-2 border">{c.parties}</td>
              <td className="p-2 border">{c.expiry}</td>
              <td className="p-2 border">{c.status}</td>
              <td className="p-2 border">{c.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ContractsTable;
