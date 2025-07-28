// src/pages/DataComparison.tsx
export default function DataComparison() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Wind Speed & Power Comparison</h1>
      <p className="text-gray-600">
        This page will allow you to compare historical wind speed data with actual power generation to identify correlations and model discrepancies.
      </p>
      {/* Chart component for comparison will go here */}
    </div>
  );
}