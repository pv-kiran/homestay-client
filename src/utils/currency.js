export const processCurrencyData = (data) => {
    // Use a Map to store unique currencies by code
    const currencyMap = new Map();

    data.forEach((country) => {
        Object.entries(country.currencies).forEach(([code, details]) => {
            // Only add the currency if we haven't seen this code before
            if (!currencyMap.has(code)) {
                currencyMap.set(code, {
                    code,
                    name: details.name,
                    symbol: details.symbol
                });
            }
        });
    });

    // Convert Map to array and sort by name
    return Array.from(currencyMap.values()).sort((a, b) =>
        a.name.localeCompare(b.name)
    );
};