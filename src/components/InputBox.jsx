import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountchange, 
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount || ""}
                    onChange={(e) => {
                        const value = e.target.value === "" ? "" : Number(e.target.value);
                        onAmountchange && onAmountchange(value); // Ensure correct prop is used here
                    }}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOption.map((currency, index) => (
                        <option key={index} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
