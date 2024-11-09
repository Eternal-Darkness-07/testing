import { useState } from "react";
import Chart from "../charts/Chart";
import axios from "axios";

// Simple CSS spinner component
const LoadingSpinner = () => (
  <div className="loader"></div> // Just the spinner, no text
);

function Monthly() {
  const [submit, setSubmit] = useState(0);
  const [chartType, setChartType] = useState("line");
  const [predictedData, setPredictedData] = useState({
    xData: [],
    yData: [],
    yPData: [],
  }); // State to store predicted data

  const [mon, setMon] = useState(""); // State for month
  const [year, setYear] = useState(""); // State for year
  const [loading, setLoading] = useState(false); // State for loading

  // Function to handle form submission
  function handelSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedMonth = formData.get("month");
    const selectedYear = formData.get("year");
    const selectedType = formData.get("type").toLowerCase(); // Convert to lowercase

    setMon(selectedMonth); // Update state for month
    setYear(selectedYear); // Update state for year
    setSubmit((prev) => prev + 1);
    setChartType(selectedType); // Set chart type

    setLoading(true); // Set loading state to true when submitting the form

    // Fetch prediction data
    fetchPredictionData(selectedMonth, selectedYear);
  }

  // Function to fetch predicted data from backend API
  const fetchPredictionData = async (month, year) => {
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        month: `${year}-${month}`, // Format as 'YYYY-MM'
      });

      const dates = Object.keys(response.data);
      const actualValues = dates.map((date) => response.data[date].actual_UD);
      const predictedValues = dates.map(
        (date) => response.data[date].predicted_UD
      );

      // Update state with the fetched data
      setPredictedData({
        xData: dates,
        yData: actualValues,
        yPData: predictedValues,
      });
      setLoading(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.error("Error fetching predicted data:", error);
      setLoading(false); // Set loading state to false if there is an error
    }
  };

  return (
    <div className="h-screen w-screen bg-[#100C2A] font-electolize font-bold">
      <div className="flex flex-col items-center justify-start h-full">
        <div className="mt-24 gap-10">
          <form
            onSubmit={handelSubmit}
            className="prediction-form bg-slate-300 flex gap-10 p-4 rounded-md"
          >
            <div className="flex flex-col">
              <label htmlFor="month">Select Month:</label>
              <select id="month" name="month" required>
                <option value="" disabled selected>
                  Select a month
                </option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, ind) => (
                  <option key={ind + 1} value={ind + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="year">Select Year:</label>
              <select id="year" name="year" required>
                <option value="" disabled selected>
                  Select a year
                </option>
                {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="type">Select Chart Type:</label>
              <select id="type" name="type" required>
                <option value="" disabled selected>
                  Select a chart type
                </option>
                {["Line", "Bar", "Scatter"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {submit !== 0 && (
          <div className="flex-grow flex items-center justify-center">
            {loading ? (
              <LoadingSpinner /> // Show loading spinner when data is loading
            ) : (
              <Chart
                key={`${mon}-${year}`} // Use dynamic key based on month and year
                chartType={chartType}
                mon={mon}
                year={year}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Monthly;
