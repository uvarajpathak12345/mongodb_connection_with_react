import axios from "axios";
import React, { useState } from "react";

export default function Input() {
  const [data, setData] = useState({
    title: "",
    year: 0,
    author: {
      firstname: "",
      lastname: "",
    },
  });

  // Update specific fields dynamically
  // const onChangeHandle = (e) => {
  //   const { id, value } = e.target; // Get the input field ID and value
  //   setData((prevData) => ({
  //     ...prevData, // Keep the existing fields
  //     [id]: id === "year" ? parseInt(value, 10) || 0 : value, // Convert year to number, keep others as string
  //   }));
  // };

  const clickHandle = async () => {
    try {
      // Sending a POST request to the backend
      const response = await axios.post("http://localhost:3000/add", {data:data});

      // Logging the response to verify the server's acknowledgment
      console.log("Data successfully posted:", response.data);
    } catch (err) {
      // Improved error logging
      console.error("Error posting data:", err.message);
    }
  };

  return (
    <>
      <div className="grid justify-center py-7 border-solid border-2 border-indigo-600">
        <label htmlFor="title">Title</label>
        <input
          value={data.title}
          onChange={(e) =>
            setData((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
          className="border-dotted border-2 border-indigo-600"
          type="text"
          id="title"
        />
        <label htmlFor="year">Year</label>
        <input
          value={data.year || ""}
          onChange={(e) => {
            setData((prev) => {
              return {
                ...prev,
                year: parseInt(e.target.value),
              };
            });
          }}
          className="border-dotted border-2 border-indigo-600"
          type="number"
          id="year"
        />

        <label htmlFor="author.firstname">First Name</label>
        <input
          value={data.author.firstname}
          onChange={(e) => {
            setData((prev) => {
              return {
                ...prev,
                author: { ...prev.author , firstname: e.target.value },
              };
            });
          }}
          className="border-dotted border-2 border-indigo-600"
          type="text"
          id="author.firstname"
        />

        <label htmlFor="author.lastname">Last Name</label>
        <input
          value={data.author.lastname}
          onChange={(e) => {
            setData((prev) => {
              return {
                ...prev,
                author: {
                  ...prev.author,
                  lastname: e.target.value,
                },
              };
            });
          }}
          className="border-dotted border-2 border-indigo-600"
          type="text"
          id="author.lastname"
        />

        <button
          onClick={clickHandle}
          className="border-solid border-2 border-indigo-600 bg-blue-800 text-white mt-4"
          type="submit"
        >
          Submit
        </button>
      </div>
    </>
  );
}
