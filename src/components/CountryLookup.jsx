'use client';

import { useEffect, useState } from 'react';

export default function CountryLookup() {
  const [country, setCountry] = useState('Turkiye');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      console.log('API Key:', process.env.NEXT_PUBLIC_IP_API_KEY); // Log the API Key
      if (!process.env.NEXT_PUBLIC_IP_API_KEY) {
        setError('API key is missing');
        return;
      }

      try {
        const response = await fetch(
          `https://extreme-ip-lookup.com/json/?key=${process.env.NEXT_PUBLIC_IP_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the fetched data
        setCountry(data.country || 'Unknown');
      } catch (error) {
        console.error('Failed to fetch country:', error);
        setError(`Failed to fetch country: ${error.message}`);
      }
    };

    getCountry();
  }, []);

  return (
    <div>
      {error ? <div>Error: {error}</div> : <div>{country}</div>}
    </div>
  );
}
