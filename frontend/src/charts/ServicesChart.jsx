import { useState } from "react";
import ReactECharts from "echarts-for-react";

function Serviceschart() {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const option = {
    darkMode: isDarkMode,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
      axisLabel: {
        formatter: '{value} hrs',
        color: isDarkMode ? '#ffffff' : '#000000'
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      name: 'Time (hrs)', // Added label for x-axis
      nameTextStyle: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontWeight: 'bold'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} GW',
        color: isDarkMode ? '#ffffff' : '#000000'
      },
      axisPointer: {
        snap: true
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? '#ffffff' : '#000000'
        }
      },
      name: 'Power Demand (GW)', // Added label for y-axis
      nameTextStyle: {
        color: isDarkMode ? '#ffffff' : '#000000',
        fontWeight: 'bold'
      }
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green'
        },
        {
          gt: 6,
          lte: 8,
          color: 'red'
        },
        {
          gt: 8,
          lte: 14,
          color: 'green'
        },
        {
          gt: 14,
          lte: 17,
          color: 'red'
        },
        {
          gt: 17,
          color: 'green'
        }
      ]
    },
    series: [
      {
        name: 'Electricity',
        type: 'line',
        smooth: true,
        data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
        markArea: {
          itemStyle: {
            color: isDarkMode ? 'rgba(255, 173, 177, 0.4)' : 'rgba(255, 173, 177, 0.6)'
          },
          data: [
            [
              {
                name: 'Morning Peak',
                xAxis: '07:30'
              },
              {
                xAxis: '10:00'
              }
            ],
            [
              {
                name: 'Evening Peak',
                xAxis: '17:30'
              },
              {
                xAxis: '21:15'
              }
            ]
          ]
        }
      }
    ],
    backgroundColor: isDarkMode ? '#28223F' : '#FFFFFF', // Chart background
    textStyle: {
      color: isDarkMode ? '#ffffff' : '#000000' // General text color
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
      <div className="relative w-screen h-full">
        <ReactECharts
          option={option}
          style={{ position: "relative", height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

export default Serviceschart;
