// src/pages/AllTrainsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Make API call to fetch all trains data and set the state
    // Replace 'YOUR_AUTH_TOKEN' with the authorization token obtained from the server
    axios.get('http://20.244.56.144/train/trains', {
      headers: {
        Authorization: 'YOUR_AUTH_TOKEN',
      },
    })
    .then((response) => {
      // Process the response and sort the trains based on the specifications
      const sortedTrains = response.data.sort((a, b) => {
        // Sort based on price (ascending)
        const priceComparison = a.price.AC - b.price.AC;
        if (priceComparison !== 0) return priceComparison;

        // Sort based on tickets (descending)
        const ticketsComparison = b.seatsAvailable.AC + b.seatsAvailable.sleeper - (a.seatsAvailable.AC + a.seatsAvailable.sleeper);
        if (ticketsComparison !== 0) return ticketsComparison;

        // Sort based on departure time (descending after considering delays in minutes)
        const aDeparture = new Date(0, 0, 0, a.departureTime.Hours, a.departureTime.Minutes + a.delayedBy, a.departureTime.Seconds);
        const bDeparture = new Date(0, 0, 0, b.departureTime.Hours, b.departureTime.Minutes + b.delayedBy, b.departureTime.Seconds);
        return bDeparture - aDeparture;
      });

      setTrains(sortedTrains);
    })
    .catch((error) => {
      console.error('Error fetching all trains:', error);
    });
  }, []);

  return (
    <div>
      {/* Display the list of trains */}
      {trains.map((train) => (
        <div key={train.trainNumber}>
          {/* Display train details here */}
        </div>
      ))}
    </div>
  );
};

export default AllTrainsPage;
