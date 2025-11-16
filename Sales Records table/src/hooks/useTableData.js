import { useState, useEffect } from 'react';
import Papa from 'papaparse';
// Use Vite raw import to read CSV content directly from src/data during development
import csvRaw from '../data/100000_Sales_Records.csv?raw';

export function useTableData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Prefer raw import which returns CSV text at build/dev time
        const csvText = typeof csvRaw === 'string' ? csvRaw : '';

        const cleanNumber = (val) => {
          if (val === null || val === undefined) return null;
          const s = String(val).trim();
          if (s === '') return null;
          // Remove commas, currency symbols, and non-numeric characters except dot and minus
          const cleaned = s.replace(/[,$£€\s]/g, '').replace(/[^0-9.-]/g, '');
          if (cleaned === '' || cleaned === '.' || cleaned === '-' ) return null;
          const n = Number(cleaned);
          return Number.isFinite(n) ? n : null;
        };

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const numericFields = ['Units Sold', 'Unit Price', 'Unit Cost', 'Total Revenue', 'Total Cost', 'Total Profit'];
            const parsedData = results.data.map((row, index) => {
              const mapped = { id: index, ...row };
              numericFields.forEach((f) => {
                if (Object.prototype.hasOwnProperty.call(mapped, f)) mapped[f] = cleanNumber(mapped[f]);
              });
              return mapped;
            });
            // Debug: log parsed headers and a sample row to verify field names and types
            try {
              if (parsedData.length > 0) {
                console.debug('useTableData: parsed row sample keys:', Object.keys(parsedData[0]));
                console.debug('useTableData: parsed row sample values:', parsedData[0]);
              } else {
                console.debug('useTableData: parsedData is empty');
              }
            } catch (e) {
              // ignore console errors in environments without console
            }
            setData(parsedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}