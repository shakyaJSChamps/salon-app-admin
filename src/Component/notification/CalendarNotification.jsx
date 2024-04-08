import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarNotification = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const handleToggleCalendar = () => {
      setShowCalendar(!showCalendar);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setShowCalendar(false);
    };
  
    return (
      <>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          customInput={<LuCalendarDays />}
          onClickOutside={handleToggleCalendar}
          calendarClassName="custom-calendar"
        />
      </>
    );
  };
  

export default CalendarNotification;
