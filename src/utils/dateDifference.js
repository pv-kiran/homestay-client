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