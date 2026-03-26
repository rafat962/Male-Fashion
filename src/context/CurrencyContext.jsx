import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CurrencyContext = createContext(null);

const CURRENCIES = {
    USD: { symbol: "$", rate: 1, label: "USD" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP" },
};

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem("currency");
        return saved && CURRENCIES[saved] ? saved : "USD";
    });

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    const formatPrice = useCallback((amount) => {
        const { symbol, rate } = CURRENCIES[currency];
        const converted = (amount * rate).toFixed(2);
        return `${symbol}${converted}`;
    }, [currency]);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies: Object.keys(CURRENCIES) }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
    return context;
};

export default CurrencyContext;
