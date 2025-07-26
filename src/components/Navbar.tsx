import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded hover:bg-blue-100 ${
      location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-semibold text-blue-600">Wind Forecast</h1>
      <div className="space-x-4">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/forecast" className={linkClass('/forecast')}>Forecast</Link>
        <Link to="/models" className={linkClass('/models')}>Models</Link>
      </div>
    </nav>
  );
}