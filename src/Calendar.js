import React from "react";
import "./Calendar.css";
import DayInMonth from "./DayInMonth";

const divideByDay = (appointments) => {
    const appointmentsByDay = {};
    appointments.forEach((appointment) => {
        const day = appointment.day;
        if (!appointmentsByDay.hasOwnProperty(day)) {
            appointmentsByDay[day] = [];
        }
        appointmentsByDay[day].push(appointment);
    });
    return appointmentsByDay;
};

export default ({
    appointments,
    handleMakeDentistSick,
    handleAddAppointment,
    handlePatientSick,
}) => {
    const appointmentsByDay = divideByDay(appointments);

    const daysInMonthJSX = Object.values(appointmentsByDay).map((appointmentsInDay, index) => (
        <DayInMonth appointments={appointmentsInDay} key={index} />
    ));

    return (
        <div className="calendarview">
            <button onClick={() => handleAddAppointment()}>Add appointment</button>
            <button onClick={() => handleMakeDentistSick()}>Make Dentist sick</button>
            <button onClick={() => handlePatientSick(99)}>Make Patient Sick</button>

            {console.log("Appointments in calendar", appointments)}
            <div className="header">
                <div>Maandag</div>
                <div>Dinsdag</div>
                <div>Woensdag</div>
                <div>Donderdag</div>
                <div>Vrijdag</div>
            </div>
            <div className="table">{daysInMonthJSX}</div>
        </div>
    );
};