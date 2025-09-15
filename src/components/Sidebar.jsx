import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Contracts Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-400">
          Contracts
        </Link>
        <Link to="/insights" className="block hover:text-blue-400">
          Insights
        </Link>
        <Link to="/reports" className="block hover:text-blue-400">
          Reports
        </Link>
        <Link to="/settings" className="block hover:text-blue-400">
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
