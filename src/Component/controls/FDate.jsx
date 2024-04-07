import { format, compareAsc } from "date-fns";

export default function FDate({ date, formatStr }) {
    if (!date) return null;
    const parsedDate = new Date(date);
    if (compareAsc(parsedDate, new Date("01-01-1970")) === 0) return null;
    return format(parsedDate, formatStr);
    }
    