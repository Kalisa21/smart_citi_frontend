import TrafficChart from '../components/TrafficChart';
import TrafficMap from '../components/TrafficMap';
import { trafficInsights, dataInsights } from '../data/sampleData';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TrafficChart />
        <TrafficMap />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Traffic Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trafficInsights.map((insight, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-3xl mb-2">{insight.icon}</div>
              <h3 className="font-bold mb-2">{insight.title}</h3>
              <p className="text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Data Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataInsights.map((insight, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
              <div className="text-3xl">{insight.icon}</div>
              <div>
                <h3 className="font-bold">{insight.title}</h3>
                <p className="text-gray-600">{insight.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}