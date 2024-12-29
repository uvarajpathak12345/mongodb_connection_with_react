import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Table() {
  const [apiData, setApiData] = useState([]); // Fixed variable name casing
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("inside fetch");
        const response = await axios.get("http://localhost:3000/books");
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData(); // Call the function
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <div>
      {error === "" ? (
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Year</th>
              <th className="border border-gray-400 px-4 py-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {apiData.map((res, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {res.title}
                </td>
                <td className="border border-gray-400 px-4 py-2">{res.year}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {res.author?.firstname || "Unknown"}{" "}
                  {res.author?.lastname || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}
