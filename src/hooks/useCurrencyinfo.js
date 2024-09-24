import { useEffect, useState } from 'react';

function useCurrencyinfo(currency) {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; 

        const fetchCurrencyData = async () => {
            try {
                const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`);
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const result = await response.json();
                if (isMounted) {
                    setData(result[currency] || {});
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            }
        };

        fetchCurrencyData();

        
        return () => {
            isMounted = false;
        };
    }, [currency]);

    // Optional: remove in production or use a condition
    console.log('Currency Data:', data);

    return { data, error };
}

export default useCurrencyinfo;
