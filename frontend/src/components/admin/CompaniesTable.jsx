import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { allCompanies = [], searchCompany } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

 

  useEffect(() => {
    const filtered = allCompanies.filter((company) => {
      if (!searchCompany) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompany.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [searchCompany, allCompanies]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full overflow-x-auto">
      <h2 className="text-gray-800 text-xl font-semibold mb-4">Companies</h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-4 py-2">Logo</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {(filterCompany || []).map((company) => (
            <tr key={company._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={company.logo}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>

              <td className="px-4 py-3">{company.name}</td>

              <td className="px-4 py-3">
                {new Date(company.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={() =>navigate(`/admin/companies/${company._id}`)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}

          {filterCompany.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;