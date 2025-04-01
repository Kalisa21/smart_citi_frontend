import { TrafficData, TrafficInsight, DataInsight } from '../types';

export const sampleTrafficData: TrafficData[] = [
  {
    cars: 120,
    bikes: 30,
    buses: 10,
    trucks: 15,
    timestamp: '2024-03-15T08:00:00',
    dayOfWeek: 'Monday',
    trafficSituation: 'High'
  },
  // Add more sample data here...
];

export const trafficInsights: TrafficInsight[] = [
  {
    icon: '📈',
    title: 'Downtown Traffic Increase',
    description: 'Due to the ongoing Food Festival this weekend.'
  },
  {
    icon: '⏱️',
    title: 'Peak Congestion Shifting',
    description: 'Morning rush hour now starts at 6:45 AM instead of 7:30 AM.'
  },
  {
    icon: '🌧️',
    title: 'Weather Impact',
    description: 'Forecasted rain tomorrow likely to increase commute times by 20%.'
  }
];

export const dataInsights: DataInsight[] = [
  {
    title: 'Busiest Day',
    value: 'Friday',
    icon: '📅'
  },
  {
    title: 'Peak Hour',
    value: '5 PM',
    icon: '⏰'
  },
  {
    title: 'Most Common Vehicle',
    value: 'Cars',
    icon: '🚗'
  }
];