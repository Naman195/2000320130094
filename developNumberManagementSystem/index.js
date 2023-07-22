const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

// Function to merge arrays and keep unique values
function mergeuniArray(arrays) {
  const mergedArray = arrays.flat();
  return [...new Set(mergedArray)].sort((a, b) => a - b);
}

// Endpoint to handle the "/numbers" API
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid request. Query parameter "url" is missing or not in the correct format.' });
  }

  try {
    const promises = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers;
      } catch (error) {
        // Ignore errors for URLs that take too long to respond
        return [];
      }
    });

    const results = await Promise.all(promises);
    const mergedNumbers = mergeuniArray(results);

    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// For testing

// http://localhost:8008/numbers?url=http://20.244.56.144/numbers/primes&url=http://20.244.56.144/numbers/fibo&url=http://20.244.56.144/numbers/odd