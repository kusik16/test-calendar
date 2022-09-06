import React, { Component } from "react";
import Calendar from "../calendar/Calendar";

import "./App.scss";

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
