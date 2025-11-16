import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function useSpotifyData(path = '/data/100000 Sales Records.csv') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(path)
      .then(res => res.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err);
            setLoading(false);
          },
        });
      })
      .catch(err => { setError(err); setLoading(false); });
  }, [path]);

  return { data, loading, error };
}
