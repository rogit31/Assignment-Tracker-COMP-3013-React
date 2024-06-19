import React, { useState } from "react";
import Create from "../Create/create";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isValid, parse, addDays } from "date-fns";

export default function Input() {
  // ----------------ASSIGNMENT TITLE ----------------
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // ------------------DATE PICKER ------------------
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [month, setMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateInputValue, setDateInputValue] = useState("");

  const tomorrow = addDays(new Date(), 1);

  const handleDateInputClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setDateInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setDateInputValue(format(date, "MM/dd/yyyy"));
      setShowDatePicker(false);
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInputValue(e.target.value);
    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <>
      <input
        placeholder="Add a new assignment"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <label htmlFor="due-date"></label>
      <input
        style={{ fontSize: "inherit" }}
        type="text"
        value={dateInputValue}
        placeholder="MM/dd/yyyy"
        onChange={handleDateInputChange}
        onClick={handleDateInputClick} // Toggle showDatePicker on input click
      />
      {showDatePicker && (
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          disabled={{ before: tomorrow }}
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          footer={
            <p aria-live="assertive" aria-atomic="true">
              Selected: {selectedDate?.toDateString()}
            </p>
          }
        />
      )}
      <Create inputValue={inputValue} dateInputValue={dateInputValue} />
    </>
  );
}

