export const formatDate = (dateString) => {
    if (!dateString) {
        return 'Invalid date';
    }

    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        return 'Invalid date format';
    }

    const [day, month, year] = dateParts;
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const formattedDay = date.getDate();
    const formattedMonth = date.toLocaleString('en-US', { month: 'short' });
    const formattedYear = date.getFullYear();

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
};
