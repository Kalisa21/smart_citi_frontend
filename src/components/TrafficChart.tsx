import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateRandomData = () => ({
  cars: Array(24).fill(0).map(() => Math.floor(Math.random() * 150)),
  bikes: Array(24).fill(0).map(() => Math.floor(Math.random() * 50)),
  buses: Array(24).fill(0).map(() => Math.floor(Math.random() * 20)),
  trucks: Array(24).fill(0).map(() => Math.floor(Math.random() * 30)),
});

export default function TrafficChart() {
  const [data, setData] = useState(generateRandomData());
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Cars',
        data: data.cars,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Bikes',
        data: data.bikes,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Buses',
        data: data.buses,
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Trucks',
        data: data.trucks,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Live Traffic Data</h2>
      <Line
        data={lineChartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Vehicle Count Over Time',
            },
          },
        }}
      />
    </div>
  );
}