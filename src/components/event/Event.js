import React, { useState } from "react";

import UpdateModal from "../updateModal/UpdateModal";

import "./event.scss";

const Event = ({ setEvents, events, event }) => {
    const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);

    const handleUpdateModal = () => {
        setIsUpdateModalShow(!isUpdateModalShow);
    };

    return (
        <div className='day__events_event' key={event.id}>
            <div onClick={() => handleUpdateModal()}>{event.title}</div>
            {isUpdateModalShow ? (
                <UpdateModal
                    handleUpdateModal={handleUpdateModal}
                    setEvents={setEvents}
                    events={events}
                    event={{
                        id: event.id,
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        createEventDate: event.createEventDate,
                        updateEventDate: event.updateEventDate || "",
                    }}
                />
            ) : null}
        </div>
    );
};

export default Event;
