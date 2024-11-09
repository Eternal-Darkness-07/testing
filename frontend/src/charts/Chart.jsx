import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import Monthly from "../component/Monthly";
function Chart({ chartType, mon, year }) {
  // State to manage dark mode and chart data
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [yData, setYData] = useState([]); // Actual data
  const [yPData, setYPData] = useState([]); // Predicted data
  const [xData, setXData] = useState([]); // X-axis data (dates)
  const [error, setError] = useState(""); // Error handling
  console.log(mon, year);
  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fetch prediction data from the backend
  const fetchPredictionData = async () => {
    try {
      // Replace this URL with your actual backend URL (Flask is running on port 5000)
      const response = await axios.post("http://localhost:5000/predict", {
        // date: "2024-01-01", // You can pass a dynamic date or month here
        month: `${year}-${mon}`,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const predictionData = response.data;
        const dates = Object.keys(predictionData);
        const actualData = dates.map((date) => predictionData[date].actual_UD);
        const predictedData = dates.map(
          (date) => predictionData[date].predicted_UD
        );

        setXData(dates); // Set x-axis data (dates)
        setYData(actualData); // Set y-axis data (actual values)
        setYPData(predictedData); // Set predicted values
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPredictionData(); // Fetch data on component mount
  }, []);

  const option = {
    darkMode: isDarkMode,
    backgroundColor: isDarkMode ? "#28223F" : "#FFFFFF", // Chart background
    colorBy: "series",
    color: [
      "#4992FF", // Actual data color
      "#91cc75", // Predicted data color
    ],
    xAxis: {
      type: "category",
      data: xData, // X-axis data (dates)
      axisLabel: {
        color: isDarkMode ? "#ffffff" : "#000000", // X-axis label color
      },
      name: "Days",
      nameLocation: "middle",
      nameTextStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // X-axis label color
        fontSize: 20,
      },
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} GW", // Y-axis label format
        color: isDarkMode ? "#ffffff" : "#000000", // Y-axis label color
      },
      name: "Peak Demand (GW)",
      nameLocation: "middle",
      nameTextStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // Y-axis label color
        fontSize: 20,
      },
      nameRotate: 90,
      nameGap: 50,
      inverse: false,
    },
    series: [
      {
        name: "Actual",
        data: yData, // Actual data
        type: chartType, // Dynamic chart type
        smooth: true,
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
      {
        name: "Predicted",
        data: yPData, // Predicted data
        type: chartType, // Dynamic chart type
        smooth: true,
        lineStyle: {
          width: 3,
        },
        symbolSize: 10,
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: "{b} => {c} GW", // Tooltip format
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}, // Option to save chart as an image
      },
    },
    legend: {
      show: true,
      textStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // Legend text color
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center pt-2 h-full w-full">
      <button
        onClick={toggleDarkMode}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      <div className="relative w-screen h-full">
        {error ? (
          <p className="text-red-500">{error}</p> // Show error message
        ) : (
          <ReactECharts
            option={option} // Pass the chart option
            style={{ position: "relative", height: "100%", width: "100%" }}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
