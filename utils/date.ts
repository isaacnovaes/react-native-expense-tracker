const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const getFormattedDate = (date: Date) => date.toISOString().slice(0, 10);

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
