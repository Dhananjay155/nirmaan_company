import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function useSalesData(path = "/data/sales_100k.csv") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err);
            setLoading(false);
          },
        });
      })
      .catch((err) => setError(err));
  }, [path]);

  return { data, loading, error };
}
