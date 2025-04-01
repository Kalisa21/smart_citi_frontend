const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('API URL not configured. Please set VITE_API_URL in .env file');
}

export async function uploadTrainingData(file: File): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/model/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to upload training data' }));
    throw new Error(errorData.message || 'Failed to upload training data');
  }

  return response.json();
}

export async function retrainModel(): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/model/retrain`, {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to retrain model' }));
    throw new Error(errorData.message || 'Failed to retrain model');
  }

  return response.json();
}

export async function getTrafficData(): Promise<{
  vehicles: {
    cars: number[];
    bikes: number[];
    buses: number[];
    trucks: number[];
  };
  timestamps: string[];
}> {
  const response = await fetch(`${API_BASE_URL}/traffic/live`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch traffic data');
  }

  return response.json();
}

export async function getTrafficHotspots(): Promise<{
  lat: number;
  lng: number;
  level: string;
  vehicles: {
    cars: number;
    bikes: number;
    buses: number;
    trucks: number;
  };
}[]> {
  const response = await fetch(`${API_BASE_URL}/traffic/hotspots`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch traffic hotspots');
  }

  return response.json();
}

export async function getPrediction(data: {
  carCount: number;
  busCount: number;
  bikeCount: number;
  truckCount: number;
  day: string;
  time: string;
}): Promise<{
  travelTime: number;
  conditions: 'Low' | 'Medium' | 'High';
  bestDepartureTime: string;
  confidence: number;
}> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to get prediction' }));
    throw new Error(errorData.message || 'Failed to get prediction');
  }

  return response.json();
}