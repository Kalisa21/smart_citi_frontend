import { Link } from 'react-router-dom';
import { TrafficCone as Traffic } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Traffic className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TrafficSense</h1>
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/retrain" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              Retrain
            </Link>
            <Link to="/predict" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
              Predict
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}