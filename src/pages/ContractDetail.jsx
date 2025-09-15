import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/contracts.json")
      .then(r => r.json())
      .then(data => {
        const found = data.find(c => c.id === id);
        setContract(found || null);
        setLoading(false);
      }).catch(() => { setContract(null); setLoading(false); });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!contract) return <div className="p-6">Contract not found. <Link to="/">Back</Link></div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            {/* contract details */}
            <h1 className="text-2xl font-semibold">{contract.name}</h1>
            <p className="text-sm text-gray-600">{contract.parties}</p>
            <div className="mt-2 text-sm">
              <span className="mr-4">Start: {contract.start || "—"}</span>
              <span className="mr-4">Expiry: {contract.expiry}</span>
              <span>Status: {contract.status}</span>
            </div>
          </div>
          <div>
            <div className="text-right">
                {/* risk score */}
              <div>Risk score: <strong>{contract.risk}</strong></div>
              {/* open evidence button for detailing the data */}
              <button onClick={()=>setDrawerOpen(true)} className="mt-2 px-3 py-1 border rounded">Open Evidence</button>
            </div>
          </div>
        </div>

        <section className="mt-6">
            {/* more information for  clauses */}
          <h3 className="font-semibold">Clauses</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {contract.clauses && contract.clauses.length ? contract.clauses.map((cl, i) => (
              <div key={i} className="border rounded p-3">
                <div className="font-medium">{cl.title}</div>
                <div className="text-sm text-gray-600">{cl.summary}</div>
                <div className="text-xs mt-2">Confidence: {(cl.confidence*100).toFixed(0)}%</div>
              </div>
            //   if no clauses availables
            )) : <div className="text-gray-600">No clauses available.</div>}
          </div>
        </section>

        <section className="mt-6">
            
          <h3 className="font-semibold">AI Insights</h3>
        
          <ul className="mt-3 space-y-2">
            {contract.insights && contract.insights.length ? contract.insights.map((ins, idx) => (
              <li key={idx} className="p-3 border rounded">
                <div className="text-sm font-medium">{ins.risk}</div>
                <div className="text-sm text-gray-700">{ins.message}</div>
              </li>
            )) : <div className="text-gray-600">No insights found.</div>}
          </ul>
        </section>
      </div>

      {/* Evidence Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 flex">
          <div className="flex-1" onClick={()=>setDrawerOpen(false)} />
          <aside className="w-96 bg-white p-4 border-l shadow-lg overflow-auto">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Evidence</h4>
              <button onClick={()=>setDrawerOpen(false)} className="px-2">Close</button>
            </div>
            {contract.evidence && contract.evidence.length ? (
              contract.evidence.map((e, i) => (
                <div key={i} className="border rounded p-3 mb-3">
                  <div className="text-sm font-medium">{e.source}</div>
                  <div className="text-sm">{e.snippet}</div>
                  <div className="text-xs mt-1">Relevance: {(e.relevance*100).toFixed(0)}%</div>
                </div>
              ))
            ) : <div className="text-gray-600">No evidence snippets.</div>}
          </aside>
        </div>
      )}
    </div>
  );
}
