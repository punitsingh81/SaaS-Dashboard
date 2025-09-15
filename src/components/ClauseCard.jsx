const ClauseCard = ({ clause }) => {
  return (
    <div className="border p-4 rounded shadow mb-3">
      <h3 className="font-semibold">{clause.title}</h3>
      <p>{clause.summary}</p>
      <p className="text-sm text-gray-500">
        Confidence: {(clause.confidence * 100).toFixed(1)}%
      </p>
    </div>
  );
};

export default ClauseCard;
