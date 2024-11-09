import { useState } from "react";
import Chart from "../charts/Chart";

function Monthly() {
  const [submit, setSubmit] = useState(0);
  const [chartType, setChartType] = useState("line"); // Store the selected chart type in lowercase

  function handelSubmit(e) {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.target);
    const selectedType = formData.get("type").toLowerCase(); // Convert the type to lowercase

    setSubmit((prev) => prev + 1);
    setChartType(selectedType); // Update the chart type in lowercase
  }

  return (
    <>
      <div className="h-screen w-screen bg-[#100C2A] font-electolize font-bold">
        {/* Form container */}
        <div className="flex flex-col items-center justify-start h-full">
          {/* Form */}
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
                  {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="type">Select Chart Type:</label>
                <select id="type" name="type" required>
                  <option value="" disabled selected>
                    Select a chart type
                  </option>
                  {["Line", "Bar","Scatter"].map((type) => (
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
              {/* Pass chartType as a prop to the Chart component */}
              <Chart chartType={chartType} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Monthly;
