// src/pages/SingleTrainPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleTrainPage = () => {
  const { trainNumber } = useParams();
  const [trainData, setTrainData] = useState(null);

  useEffect(() => {
    // Make API call to fetch data of a specific train and set the state
    // Replace 'YOUR_AUTH_TOKEN' with the authorization token obtained from the server
    axios.get(`http://20.244.56.144/train/trains/${trainNumber}`, {
      headers: {
        Authorization: "eyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9 eyJleHAiOjE20DI2MjkyNjQs ImNvbXBhbn10YW1lIjoiVHJhaW4gQ2Vud HJhbCIsImNsaWVudElEIjoiYjQ2MTE4ZjAtZmJkZSO0YjE2LWEOYjEtNmF1NmFkNzE8YjI3Ině.v93QcxrZHWDTnTwm0-6t toTGI4C65Grhn3rIJDC8fy8",
      },
    })
    .then((response) => {
      setTrainData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching single train:', error);
    });
  }, [trainNumber]);

  return (
    <div>
      {trainData ? (
        <div>
          {/* Display the details of the specific train */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleTrainPage;
