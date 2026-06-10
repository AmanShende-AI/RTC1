import React from "react";

const filerData = [
  {
    filterType: "Location",
    array: ["Delhi", "Mumbai", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "40K-60K", "60K-1L+"],
  },
];

const FilterCard = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm w-full max-w-xs">
      
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Filters
      </h2>

      <div className="flex flex-col gap-6">
        {filerData.map((data, index) => (
          <div key={index}>
            
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {data.filterType}
            </h3>

            <div className="flex flex-col gap-2">
              {data.array.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name={data.filterType}
                    value={item}
                    className="accent-indigo-600"
                  />
                  {item}
                </label>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default FilterCard;