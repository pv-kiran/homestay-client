import { parse, isValid } from 'date-fns';

export const calculateDifferenceInDays = (date) => {
    const today = new Date(); // Get the current date
    const givenDate = new Date(date); // Parse the given date
    const differenceInTime = givenDate - today; // Difference in milliseconds

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString(); // Example output: "Thu Feb 27 2025"
}


export const parseDateString = (value, originalValue) => {
    // Return undefined for empty values
    if (!originalValue) return undefined;

    // If already a Date object, return it directly
    if (originalValue instanceof Date) {
        return isValid(originalValue) ? originalValue : null;
    }

    // For string inputs, handle different formats
    if (typeof originalValue === 'string') {
        // Try dd-MM-yyyy format (e.g. 17-10-2025)
        const dateFromDashes = parse(originalValue, 'dd-MM-yyyy', new Date());
        if (isValid(dateFromDashes)) return dateFromDashes;

        // Try dd/MM/yyyy format (e.g. 17/10/2025)
        const dateFromSlashes = parse(originalValue, 'dd/MM/yyyy', new Date());
        if (isValid(dateFromSlashes)) return dateFromSlashes;

        // Let Yup try its default parsing as a fallback
        return new Date(originalValue);
    }

    // For any other case, return the original value
    return originalValue;
};