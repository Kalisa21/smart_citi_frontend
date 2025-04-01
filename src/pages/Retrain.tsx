import { useState } from 'react';
import { Upload } from 'lucide-react';

const API_URL = 'https://fastapi-fezf.onrender.com'; // Your render URL

async function uploadTrainingData(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_URL}/retrain`, {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Failed to upload and retrain');
  }
  return data;
}

export default function Retrain() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [trainingResult, setTrainingResult] = useState<{
    message: string;
    filename: string;
    test_accuracy: number;
    visualizations: {
      car_count_distribution: { image: string; description: string };
      total_vehicles_by_hour: { image: string; description: string };
      heavy_vehicle_ratio: { image: string; description: string };
    } | null;
  } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setUploadSuccess(false);
    setTrainingResult(null);
    setSelectedFile(file);
    
    setIsProcessing(true);
    try {
      const result = await uploadTrainingData(file);
      setUploadSuccess(true);
      setTrainingResult({
        message: result.message,
        filename: result.filename,
        test_accuracy: result.test_accuracy,
        visualizations: result.visualizations
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setUploadSuccess(false);
      setSelectedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Retrain Traffic Model</h2>
        
        <div className="mb-8">
          <label 
            htmlFor="file-upload"
            className={`
              relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300
              p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2 ${isProcessing ? 'opacity-50' : ''}
            `}
          >
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isProcessing}
            />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <span className="text-sm font-medium text-blue-600">
                  Upload a file
                </span>
                <p className="text-xs text-gray-500">
                  or drag and drop
                </p>
              </div>
              <p className="text-xs text-gray-500">
                CSV files only (containing traffic data)
              </p>
            </div>
          </label>
          
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {selectedFile.name}
            </p>
          )}

          {uploadSuccess && trainingResult && (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-green-600">
                  {trainingResult.message}
                </p>
                <p className="text-sm text-gray-600">
                  Accuracy: {(trainingResult.test_accuracy * 100).toFixed(2)}%
                </p>
              </div>

              {trainingResult.visualizations && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Car Count Distribution</h3>
                    <img 
                      src={`data:image/png;base64,${trainingResult.visualizations.car_count_distribution.image}`} 
                      alt="Car Count Distribution"
                      className="max-w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {trainingResult.visualizations.car_count_distribution.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Total Vehicles by Hour</h3>
                    <img 
                      src={`data:image/png;base64,${trainingResult.visualizations.total_vehicles_by_hour.image}`} 
                      alt="Total Vehicles by Hour"
                      className="max-w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {trainingResult.visualizations.total_vehicles_by_hour.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Heavy Vehicle Ratio</h3>
                    <img 
                      src={`data:image/png;base64,${trainingResult.visualizations.heavy_vehicle_ratio.image}`} 
                      alt="Heavy Vehicle Ratio"
                      className="max-w-full h-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      {trainingResult.visualizations.heavy_vehicle_ratio.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 text-sm text-gray-600">
            Processing... This may take a few minutes while the model retrains
          </div>
        )}
      </div>
    </div>
  );
}