import { useState } from "react";

const EvidenceDrawer = ({ evidence }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        View Evidence
      </button>

      {open && (
        <div className="fixed inset-0 flex">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setOpen(false)} />
          <div className="w-80 bg-white p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Evidence</h2>
            {evidence.map((e, i) => (
              <div key={i} className="border-b pb-2 mb-2">
                <p className="font-semibold">{e.source}</p>
                <p className="text-sm">{e.snippet}</p>
                <p className="text-xs text-gray-500">
                  Relevance: {(e.relevance * 100).toFixed(1)}%
                </p>
              </div>
            ))}
            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EvidenceDrawer;
