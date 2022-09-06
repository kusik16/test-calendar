import React from "react";

import { getMonth, getYear } from "../../utils/moment-utils";
import { getMonthSet } from "../../utils/date-utils";
import { monthsFull } from "../../constants/dates";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./calendarHeader.scss";

const CalendarHeader = ({ selectDate, setSelectDate, handleModal }) => {
    const monthSet = getMonthSet(selectDate);

    const hideInput = true;

    return (
        <div className='calendar__header'>
            <div className='calendar__header_left-container'>
                <IconButton
                    color='primary'
                    onClick={(e) => handleModal(e)}
                    size='large'>
                    <AddCircleIcon fontSize='inherit' />
                </IconButton>
            </div>
            <div className='calendar__header_right-container'>
                <IconButton
                    onClick={() => setSelectDate(monthSet.prev)}
                    size='small'>
                    <KeyboardArrowLeftIcon fontSize='inherit' />
                </IconButton>
                <div className='choosenDate'>
                    {`${monthsFull[getMonth(monthSet.current)]} ${getYear(
                        selectDate,
                    )}`}
                </div>
                <IconButton
                    onClick={() => setSelectDate(monthSet.next)}
                    size='small'>
                    <KeyboardArrowRightIcon fontSize='inherit' />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        views={["month", "year"]}
                        inputFormat='MM/DD/YYYY'
                        value={selectDate}
                        onChange={(newValue) => {
                            setSelectDate(newValue);
                        }}
                        renderInput={
                            hideInput
                                ? ({ inputRef, inputProps, InputProps }) => (
                                      <Box ref={inputRef}>
                                          {InputProps?.endAdornment}
                                      </Box>
                                  )
                                : (params) => <TextField {...params} />
                        }
                    />
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default CalendarHeader;
