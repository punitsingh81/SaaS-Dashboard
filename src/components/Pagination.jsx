const Pagination = () => {
  return (
    <div className="flex bg-white justify-end cursor-pointer items-center mt-4 gap-2">
      <button className="px-3  py-1 border cursor-pointer rounded hover:bg-gray-800">
        Prev
      </button>
      <button className="px-3 py-1 border rounded hover:bg-gray-800">
        Next
      </button>
    </div>
  );
};

export default Pagination;
