import { useState } from 'react';
import { PredictionFormData } from '../types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const times = Array.from({ length: 24 }, (_, i) => 
  `${String(i).padStart(2, '0')}:00`
);

interface PredictionResult {
  prediction: string;
  input_data: PredictionFormData;
}

export default function Predict() {
  const [formData, setFormData] = useState<PredictionFormData>({
    carCount: 0,
    busCount: 0,
    bikeCount: 0,
    truckCount: 0,
    day: 'Monday',
    time: '00:00'
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPrediction = async (data: PredictionFormData): Promise<PredictionResult> => {
    const response = await fetch('https://fastapi-fezf.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CarCount: data.carCount,
        BusCount: data.busCount,
        BikeCount: data.bikeCount,
        TruckCount: data.truckCount,
        Day: data.day,
        Time: data.time
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getPrediction(formData);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof PredictionFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : parseInt(String(value)) || 0
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Traffic Prediction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Car Count', field: 'carCount' },
              { label: 'Bus Count', field: 'busCount' },
              { label: 'Bike Count', field: 'bikeCount' },
              { label: 'Truck Count', field: 'truckCount' },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData[field as keyof PredictionFormData] || ''}
                  onChange={(e) => handleInputChange(field as keyof PredictionFormData, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <select
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {times.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full bg-blue-600 text-white py-2 px-4 rounded-lg
              hover:bg-blue-700 focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? 'Predicting...' : 'Get Traffic Prediction'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">Error: {error}</p>
          </div>
        )}

        {prediction && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Prediction Results</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Traffic Situation</p>
                  <p className={`text-lg font-semibold ${
                    prediction.prediction.toLowerCase().includes('heavy') ? 'text-red-600' :
                    prediction.prediction.toLowerCase().includes('normal') ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {prediction.prediction}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Input Parameters</p>
                  <p className="text-sm">
                    Cars: {prediction.input_data.carCount} | 
                    Buses: {prediction.input_data.busCount} | 
                    Bikes: {prediction.input_data.bikeCount} | 
                    Trucks: {prediction.input_data.truckCount} | 
                    {prediction.input_data.day} {prediction.input_data.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}