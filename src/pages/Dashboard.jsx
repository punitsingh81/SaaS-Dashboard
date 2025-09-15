import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Small pagination component inline for brevity
function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page===1} className="px-2 py-1 cursor-pointer  rounded border">Prev</button>
      <span>{page}/{totalPages}</span>
      <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page===totalPages} className="px-2 py-1 cursor-pointer  rounded border">Next</button>
    </div>
  );
}

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("/contracts.json")
      .then(r => r.json())
      .then(data => { setContracts(data); setLoading(false); })
      .catch(err => { setError("Failed to load"); setLoading(false); });
  }, []);

  const filtered = contracts
    .filter(c => (search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.parties.toLowerCase().includes(search.toLowerCase())))
    .filter(c => (statusFilter === "" || c.status === statusFilter))
    .filter(c => (riskFilter === "" || c.risk === riskFilter));

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <div className="p-6">Loading contracts...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!contracts.length) return <div className="p-6">No contracts yet</div>;

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="flex">
        <aside className="w-64 p-4 bg-gray-200 cursor-pointer h-screen border-r">
          <h3 className="font-semibold">Sidebar</h3>
          <nav className="mt-4 space-y-2">
            {/* navbar */}
            <a href="/#" className="block py-2">Contracts</a>
            <a href="/#" className="block py-2">Insights</a>
            <a  href= "/#" className="block py-2">Reports</a>
            <a href= "/#" className="block py-2">Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <input placeholder="Search by name or parties" value={search} onChange={e=>setSearch(e.target.value)}
                className="border p-2 bg-gray-200 rounded" />
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border p-2 bg-gray-200 rounded">
                {/* showing the status */}
                <option value="">All Status</option>
                <option>Active</option>
                <option>Expired</option>
                <option>Renewal Due</option>
              </select>
              <select value={riskFilter} onChange={e=>setRiskFilter(e.target.value)} className="border p-2 bg-gray-200 rounded">
                {/* value lavel of option at risk  */}
                <option value="">All Risk</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              {/* placeholder for Upload modal trigger */}
              <button className="px-3 py-2 border text white rounded">Upload Files</button>
            </div>
          </div>

          <div className="bg-gray-300 rounded shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  {/* information of pages */}
                  <th className="p-3 text-left ">Contract Name</th>
                  <th className="p-3 text-left">Parties</th>
                  <th className="p-3 text-left">Expiry Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Risk</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map(c => (
                  <tr key={c.id} className="border-t ">
                    {/* the details of pages */}
                    <td className="p-3"><Link to={`/contracts/${c.id}`} className="text-indigo-600">{c.name}</Link></td>
                    <td className="p-3">{c.parties}</td>
                    <td className="p-3">{c.expiry}</td>
                    <td className="p-3">{c.status}</td>
                    <td className="p-3">{c.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {/* for showing the page length */}
            <div className="text-sm ">Showing {pageItems.length} of {filtered.length}</div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </main>
      </div>
    </div>
  );
}
