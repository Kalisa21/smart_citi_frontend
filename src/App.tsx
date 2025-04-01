import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Retrain from './pages/Retrain';
import Predict from './pages/Predict';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/retrain" element={<Retrain />} />
            <Route path="/predict" element={<Predict />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;