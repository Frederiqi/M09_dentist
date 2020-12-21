import React, { useState, useEffect } from "react";
import App from "./App";

import { personData, dentistData, assistantData } from "./persondata";

const AppContainer = () => {
    const [patients, setPatients] = useState(personData);
    const [dentists, setDentists] = useState(dentistData);
    const [assistants, setAssistants] = useState(assistantData);
    const [appointments, setAppointments] = useState([]);

    const getRandomTime = () => {
        let hour;
        while (true) {
            hour = Math.floor(Math.random() * 24);
            if (hour > 7 && hour < 19) {
                return hour;
            }
        }
    };

    const getRandomDay = () => Math.floor(Math.random() * 28) + 1;

    const getRandomPatient = () => {
        const person = patients[Math.floor(Math.random() * (personData.length - 1))];
        return `${person.first_name} ${person.last_name}`;
    };

    const getRandomDentist = () => {
        const dentist = dentists[Math.floor(Math.random() * (dentistData.length - 1))];
        return `${dentist.first_name} ${dentist.last_name}`;
    };

    const getRandomAssistent = () => {
        const assistant = assistants[Math.floor(Math.random() * assistantData.length)];
        return `${assistant.first_name} ${assistant.last_name}`;
    };

    const generateRandomAppointment = () => ({
        day: getRandomDay(),
        time: getRandomTime(),
        patient: getRandomPatient(),
        dentist: getRandomDentist(),
        assistant: getRandomAssistent(),
        dentistSick: false,
    });

    const generateRandomAppointments = (num) =>
        Array(num)
            .fill(0)
            .map((_) => generateRandomAppointment());

    const randomAppointments = generateRandomAppointments(150);

    useEffect(() => {
        setAppointments(randomAppointments);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addDentist = (state, first_name, last_name, email, phone) => {
        const newId = state.length + 1;
        const newDentist = { id: newId, first_name, last_name, email, phone };

        return [...state, newDentist];
    };

    const addPatient = (state, first_name, last_name, email, phone) => {
        const newId = state.length + 1;
        const newPatient = { id: newId, first_name, last_name, email, phone };
        return [...state, newPatient];
    };

    const addAssistant = (state, first_name, last_name, email, phone) => {
        const newId = state.length + 1;
        const newAssistant = { id: newId, first_name, last_name, email, phone };
        return [...state, newAssistant];
    };

    const makeDentistSick = (state, dentistId) => {
        const findSickDentist = state.filter((dentist) => {
            return dentist.id === dentistId;
        });

        const sickDentistFullName = `${findSickDentist[0].first_name} ${findSickDentist[0].last_name}`;

        const markAppointmentsSick = appointments.map((appointment) => {
            if (appointment.dentist === sickDentistFullName) {
                appointment.dentistSick = true;
            }
            return appointment;
        });
        setAppointments(markAppointmentsSick);
    };

    const addAppointment = (state, day, time, patientId, dentistId) => {
        const patient = patients.filter((patient) => {
            return patientId === patient.id;
        });
        const dentist = dentists.filter((dentist) => {
            return dentistId === dentist.id;
        });

        const patientFullName = `${patient[0].first_name} ${patient[0].last_name}`;

        const dentistFullName = `${dentist[0].first_name} ${dentist[0].last_name}`;

        const newAppointments = [
            ...state,
            { day, time, patient: patientFullName, dentist: dentistFullName, dentistSick: false },
        ];

        console.log(newAppointments);
    };

    const removeAppointment = (state, patient, time) => {
        const removedAppointment = state.filter((appointment) => {
            if (appointment.patient === patient && appointment.time === time) {
                return false;
            } else {
                return true;
            }
        });
        setAppointments(removedAppointment);
    };

    const removeAllAppointments = (state, patient) => {
        const removedAppointment = state.filter((appointment) => {
            if (appointment.patient === patient) {
                return false;
            } else {
                return true;
            }
        });
        setAppointments(removedAppointment);
    };

    const changeAppointment = (state, patient, time, newTime, newDate) => {
        console.log(state, patient, time, newTime, newDate);

        const newAppointments = appointments.map((appointment) => {
            if (appointment.patient === patient && appointment.time === time) {
                appointment.time = newTime;
                appointment.day = newDate;
                console.log(appointment);
            }
            return appointment;
        });

        setAppointments(newAppointments);
    };

    const handleAddDentist = () => {
        const newDentistsState = addDentist(
            dentists,
            "Sandra",
            "Tooth",
            "06123451234",
            "sandra@tandartspraktijkbvt.nl"
        );
        setDentists(newDentistsState);
    };

    const handleAddPatient = () => {
        const newPatientsState = addPatient(
            patients,
            "John",
            "Bigsmile",
            "0656785678",
            "john@something.nl"
        );
        setPatients(newPatientsState);
    };

    const handleAddAssistant = () => {
        const newAssistantsState = addAssistant(
            assistants,
            "Kamala",
            "Mouth",
            "0611223344",
            "kamala@tandartspraktijkbvt.nl"
        );
        setAssistants(newAssistantsState);
    };

    const handleMakeDentistSick = () => {
        makeDentistSick(dentists, 997);
    };

    const handleAddAppointment = () => {
        addAppointment(appointments, 8, 11, 105, 996);
    };

    const handleRemoveAppointment = (patient, time) => {
        removeAppointment(appointments, patient, time);
    };

    const handlePatientSick = (patientId) => {
        const patient = patients.filter((patient) => {
            return patient.id === patientId;
        });

        const patientFullName = `${patient[0].first_name} ${patient[0].last_name}`;
        removeAllAppointments(appointments, patientFullName);
    };

    const handleMoveAppointment = (patient, time, newTime, newDate) => {
        changeAppointment(appointments, patient, time, newTime, newDate);
    };

    return (
        <div>
            <App
                appointments={appointments.sort((a, b) => a.time - b.time)}
                dentists={dentists}
                handleMakeDentistSick={handleMakeDentistSick}
                handleAddDentist={handleAddDentist}
                handleAddPatient={handleAddPatient}
                handleAddAssistant={handleAddAssistant}
                handleAddAppointment={handleAddAppointment}
                handleRemoveAppointment={handleRemoveAppointment}
                handlePatientSick={handlePatientSick}
                handleMoveAppointment={handleMoveAppointment}
            />
        </div>
    );
};

export default AppContainer;