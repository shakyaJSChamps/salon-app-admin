import { format, parse } from 'date-fns'

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

    return `${formattedDay}-${formattedMonth}-${formattedYear}`;
};


export const formatDisplayDate = (dateString) => {
    // Date formats to try parsing
    const formats = [
        'yyyy-MM-dd',
        'dd-MM-yyyy',
        'MM-dd-yyyy',
        'yyyy/MM/dd',
        'dd/MM/yyyy',
        'MM/dd/yyyy',
        'dd-MMM-yyyy',
        'MMM dd, yyyy'
    ];

    let parsedDate;

    for (let fmt of formats) {
        try {
            parsedDate = parse(dateString, fmt, new Date());
            if (!isNaN(parsedDate)) break;
        } catch (error) {
            continue;
        }
    }
    if (!parsedDate || isNaN(parsedDate)) {
        return 'Invalid Date Format';
    }

    return format(parsedDate, 'dd-MMM-yyyy');
};


export const formatInputDate = (dateInput) => {
    if (!dateInput) return ""; // Handle null or undefined dateInput

    // Check if the input is already in yyyy-MM-dd format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        return dateInput;
    }

    // Try parsing different formats
    const formats = [
        'dd-MM-yyyy',
        'MM-dd-yyyy',
        'yyyy/MM/dd',
        'dd/MM/yyyy',
        'MM/dd/yyyy',
        'dd-MMM-yyyy',
        'MMM dd, yyyy'
    ];

    let parsedDate;

    for (let fmt of formats) {
        try {
            parsedDate = parse(dateInput, fmt, new Date());
            if (!isNaN(parsedDate)) break;
        } catch (error) {
            continue;
        }
    }

    if (!parsedDate || isNaN(parsedDate)) {
        throw new Error('Invalid date format');
    }

    // Format the parsed date as yyyy-MM-dd for input field
    return format(parsedDate, 'yyyy-MM-dd');
};
