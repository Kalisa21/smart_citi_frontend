export interface TrafficData {
  cars: number;
  bikes: number;
  buses: number;
  trucks: number;
  timestamp: string;
  dayOfWeek: string;
  trafficSituation: 'Low' | 'Medium' | 'High';
}

export interface PredictionFormData {
  carCount: number;
  busCount: number;
  bikeCount: number;
  truckCount: number;
  day: string;
  time: string;
}

export interface PredictionResult {
  travelTime: number;
  conditions: 'Low' | 'Medium' | 'High';
  bestDepartureTime: string;
  confidence: number;
}

export interface TrafficInsight {
  icon: string;
  title: string;
  description: string;
}

export interface DataInsight {
  title: string;
  value: string;
  icon: string;
}