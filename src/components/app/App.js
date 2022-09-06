import React, { Component } from "react";
import "./App.scss";

import Calendar from "../calendar/Calendar";

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Calendar
                    onDateSelect={(date) => {
                        return date;
                    }}
                    activeDates={null}
                />
            </div>
        );
    }
}

export default App;
