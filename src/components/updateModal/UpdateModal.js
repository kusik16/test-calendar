import PropTypes from "prop-types";
import { useState } from "react";

import moment from "moment";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import "./updateModal.scss";

const UpdateModal = ({ setEvents, events, handleUpdateModal, event }) => {
    const {
        date,
        time,
        id,
        title,
        description,
        createEventDate,
        updateEventDate,
    } = event;

    console.log(event);

    console.log(createEventDate, updateEventDate);

    const [updateDate, setUpdateDate] = useState(date);
    const [updateTime, setUpdateTime] = useState(time);
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateDescription, setUpdateDescription] = useState(description);

    const onUpdateEvent = (e) => {
        e.preventDefault();

        const newEvent = {
            id: id,
            title: updateTitle || "no title",
            description: updateDescription || "no desctiption",
            date: updateDate || `Updated at ${moment().format()}`,
            time: updateTime || moment().format(),
            updateEventDate: `Updated at ${moment().format(
                "DD-MM-YYYY HH:mm",
            )}`,
        };

        setEvents([newEvent, ...events.filter((event) => event.id !== id)]);

        localStorage.setItem(
            "events",
            JSON.stringify([
                newEvent,
                ...events.filter((event) => event.id !== id),
            ]),
        );
        handleUpdateModal();
    };

    const onDeleteEvent = (id) => {
        setEvents([...events.filter((event) => event.id !== id)]);

        localStorage.setItem(
            "events",
            JSON.stringify([...events.filter((event) => event.id !== id)]),
        );
        handleUpdateModal();
    };

    return (
        <div className='overlay'>
            <Box
                className='modal'
                onSubmit={(e) => onUpdateEvent(e)}
                component='form'
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    margin: "0 auto",
                    borderRadius: "5px",
                    marginBottom: "25px",
                }}
                noValidate
                autoComplete='off'>
                <div className='modal__header'>
                    <div>
                        <div className='modal__header_title'>
                            Edit idea item
                        </div>
                        <div className='modal__header_subtitle'>
                            {updateEventDate || createEventDate}
                        </div>
                    </div>
                    <IconButton
                        onClick={() => handleUpdateModal()}
                        size='large'>
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                </div>
                <TextField
                    sx={{
                        width: "100%",
                        marginBottom: "15px",
                    }}
                    id='name'
                    label='Title'
                    variant='standard'
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <TextField
                    sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                    }}
                    multiline
                    rows={4}
                    id='name'
                    label='Description'
                    variant='standard'
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                />
                <div className='modal__dates'>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label='Date desktop'
                            inputFormat='DD/MM/YYYY'
                            value={updateDate}
                            onChange={(newValue) => {
                                setUpdateDate(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField variant='standard' {...params} />
                            )}
                        />
                        <TimePicker
                            label='Time'
                            inputFormat='HH:mm'
                            value={updateTime}
                            onChange={(newValue) => {
                                setUpdateTime(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    variant='standard'
                                    sx={{
                                        width: "30%",
                                    }}
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </div>
                <div className='modal__buttons'>
                    <IconButton
                        onClick={() => onDeleteEvent(id)}
                        sx={{}}
                        color='error'
                        aria-label='delete'
                        size='large'>
                        <DeleteIcon fontSize='inherit' />
                    </IconButton>
                    <Button
                        type='submit'
                        sx={{
                            // width: "10%",
                            margin: "15px",
                        }}
                        variant='contained'>
                        Save
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default UpdateModal;

// Modal.propTypes = {
// 	onAddContact: PropTypes.func.isRequired,
// };
