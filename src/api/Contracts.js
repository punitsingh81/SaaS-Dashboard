export const fetchContracts = async () => {
  const res = await fetch("/api/contracts");
  if (!res.ok) throw new Error("Failed to fetch contracts");
  return res.json();
};

export const fetchContractById = async (id) => {
  const res = await fetch("/api/contracts");
  const data = await res.json();
  return data.find((c) => c.id === id);
};
