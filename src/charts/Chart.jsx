import ReactECharts from "echarts-for-react";
import { useState } from "react";

function Chart({ chartType }) {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const xData = [
    "01.01.22", "02.01.22", "03.01.22", "04.01.22", "05.01.22", "06.01.22",
    "07.01.22", "08.01.22", "09.01.22", "10.01.22", "11.01.22", "12.01.22",
    "13.01.22", "14.01.22", "15.01.22", "16.01.22", "17.01.22", "18.01.22",
    "19.01.22", "20.01.22", "21.01.22", "22.01.22", "23.01.22", "24.01.22",
    "25.01.22", "26.01.22", "27.01.22", "28.01.22", "29.01.22", "30.01.22",
    "31.01.22"
  ];

  const yData = [5.134, 4.91, 5.257, 5.241, 5.538, 5.137, 5.106, 5.337, 5.435, 5.269, 5.054,
    5.259, 5.537, 4.888, 4.969, 5.537, 5.054, 4.969, 5.798, 5.491, 5.522, 5.816,
    5.526, 5.71, 5.537, 4.888, 4.969, 5.054, 5.259, 5.269, 5.318
  ];

  const yPData = [4.76382303, 5.10765464, 4.92634586, 5.29025423, 5.12467548, 4.94210562, 
    4.70041908, 4.88072114, 5.22074556, 5.37295625, 5.45918828, 4.94285839, 
    5.27483839, 5.2632412, 4.94615048, 5.17988373, 5.5820567, 5.02745615, 
    5.09662365, 5.25045616, 5.32256394, 5.54741323, 5.55507679, 5.47672217, 
    5.55872037, 5.33265449, 4.81950005, 4.72110363, 4.9101592, 5.43375144, 
    5.46461218
    ];

  // Conditionally apply dark mode styles
  const option = {
    darkMode: isDarkMode,
    backgroundColor: isDarkMode ? "#28223F" : "#FFFFFF", // Chart background
    colorBy: "series",
    color: [
      "#4992FF",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc"
    ],
    xAxis: {
      type: "category",
      data: xData,
      axisLabel: {
        color: isDarkMode ? "#ffffff" : "#000000", // X-axis label color
      },
      name: "Days",
      nameLocation: "middle",
      nameTextStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // X-axis label color
        fontSize: 20
      },
      nameGap: 30
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: '{value} GW',
        color: isDarkMode ? "#ffffff" : "#000000", // Y-axis label color
      },
      name: "Peak Demand (GW)",
      nameLocation: "middle",
      nameTextStyle: {
        color: isDarkMode ? "#ffffff" : "#000000", // Y-axis label color
        fontSize: 20
      },
      nameRotate: 90,
      nameGap: 50,
      inverse: false
    },
    series: [
      {
        name: "Actual",
        data: yData,
        type: chartType,
        smooth: true,
        lineStyle: {
          width: 3
        },
        symbolSize: 10
      },
      {
        name: "Predicted",
        data: yPData,
        type: chartType,
        smooth: true,
        lineStyle: {
          width: 3
        },
        symbolSize: 10
      }
    ],
    tooltip: {
      trigger: "item",
      formatter: "{b}=> {c} GW"
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      show: true,
      textStyle: {
        color: isDarkMode ? "#ffffff" : "#000000" // Legend text color
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center pt-2 h-full w-full">
      <button
        onClick={toggleDarkMode}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
      {/* <h3 className={`text-3xl ${isDarkMode ? "text-white" : "text-black"}`}>Charts</h3> */}
      <div className="relative w-screen h-full">
        <ReactECharts
          option={option}
          style={{ position: "relative", height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

export default Chart;
