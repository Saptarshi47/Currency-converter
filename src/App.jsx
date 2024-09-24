import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyinfo from "./hooks/useCurrencyinfo";
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionHistory, setConversionHistory] = useState([]); // New state for conversion history

  const currencyInfo = useCurrencyinfo(from);

  if (currencyInfo.error) {
    return <p>Error fetching currency data: {currencyInfo.error}</p>;
  }

  const option = Object.keys(currencyInfo.data);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    if (currencyInfo.data[to]) {
      const result = amount * currencyInfo.data[to];
      setConvertedAmount(result);
      // Add the conversion to history
      setConversionHistory(prevHistory => [
        ...prevHistory,
        `${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`
      ]);
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-lg mx-auto border border-gray-300 rounded-lg p-5 bg-white/70 backdrop-blur-md shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-3">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={option}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountchange={(value) => setAmount(value)}
            />
          </div>
          <div className="relative w-full my-2 flex justify-center">
            <button
              type="button"
              className="border-2 border-gray-400 rounded-full bg-blue-600 text-white px-4 py-1"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={option}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              onAmountchange={() => {}}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Convert
          </button>
        </form>

        {/* Conversion History */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold">Conversion History:</h3>
          <ul className="list-disc pl-5 mt-2">
            {conversionHistory.length === 0 ? (
              <li>No conversions yet.</li>
            ) : (
              conversionHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
