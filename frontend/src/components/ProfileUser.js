import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import doctorActions from "../redux/actions/doctorActions";
import React from "react";
import { Accordion, AccordionItem } from "react-sanfona";
import patientActions from "../redux/actions/patientActions";
import Appoint from "./Appoint";
import AppointUser from "./AppointUser";
import userActions from "../redux/actions/userActions";

const ProfileUser = ({
  user,
  getAppointments,
  deleteAppointment,
  confirmFormMail,
  token,
  deleteAllAppointmentByDoctor,
  deleteProfileDoctor,
  history,
  logOut,
}) => {
   const { doc, src, name, lastName, dni, data, socialWork} = user
   const [appointments, setAppointments] = useState([])
   const [loading, setLoading] = useState(true)
   const [change, setChange] = useState([])
   const [confirmDelete, setConfirmDelete] = useState(false)
   const [deleteDoctor, setDeleteDoctor] = useState(false)
   
  useEffect(() => {
    getAppointments(token).then((res) => {
      if (res.success) {
        setAppointments(res.res);
        setLoading(false);
        return false;
      }
    });

    // eslint-disable-next-line
  }, [change]);

  if (loading) {
    return <div className="containerLoading">
       <img src="/assets/loader.gif" alt ="..."/>
    </div>
  }

  const filterDays = (dayM) => {
    let day = appointments.filter((appointment) =>
      appointment.date.date.includes(dayM)
    );
    return day;
  };

  const deleteAppoint = (appointment) => {
    deleteAppointment(token, appointment._id).then((res) => setChange(res.res));
    if (typeof appointment.patientId == "string") {
      confirmFormMail(appointment.date, token, appointment.doctorId, false);
    } else {
      confirmFormMail(appointment.date, token, appointment.patientId, false);
    }
    setConfirmDelete(!confirmDelete);
  };

  const lunes = filterDays("Lunes");
  const martes = filterDays("Martes");
  const miercoles = filterDays("Miércoles");
  const jueves = filterDays("Jueves");
  const viernes = filterDays("Viernes");

  const drawAccordion = (day, day2) => {
    return (
      <Accordion>
        <AccordionItem className="accordion" title={day} expanded={day === 1}>
          {day2.length === 0 ? (
            <p>No hay turnos por el momento.</p>
          ) : (
            day2.map((appointment) => {
              return (
                <Appoint
                  key={appointment._id}
                  appointment={appointment}
                  deleteAppoint={deleteAppoint}
                />
              );
            })
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  const deletDoctor = () => {
    deleteAllAppointmentByDoctor(token).then((res) => {
      if (res.success) {
        deleteProfileDoctor(token).then(() => {
          logOut();
          history.push("/");
        });
        return false;
      }
    });
  };

  return (
    <div className="profile">
      <div className="leftProfile">
        <div
          className="profileImg"
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
        <h4>Bienvenido/a, {name}</h4>
        <p>
          Completá tus datos y mantenelos actualizados en el siguiente botón.
        </p>

        <button>
          <Link
            className="linkCompleta"
            to={!doc ? "/patient/profile" : "/doc/profile"}
          >
            COMPLETAR PERFIL
          </Link>
        </button>
        {doc && !deleteDoctor && (
          <button id="deleteAccountDoc" onClick={() => setDeleteDoctor(!deleteDoctor)}>
            ELIMINAR CUENTA
          </button>
        )}
        {deleteDoctor && (
          <div className="deleteAccount">
            <h4>¿Estás seguro/a de eliminar tu cuenta?</h4>
            <p>Se borrarán los siguientes datos:</p>
            <li>Información personal.</li>
            <li>Información relacionada a pacientes y turnos.</li>
            <button
              id="buttonDeleteProfile"
              onClick={() => setDeleteDoctor(!deleteDoctor)}
            >
              CANCELAR
            </button>
            <button
              id="buttonDeleteProfile2"
              onClick={() => {
                deletDoctor();
              }}
            >
              ELIMINAR DE TODOS MODOS
            </button>
          </div>
        )}
      </div>
      <div className="centroProfile">
        <div className="datosProfile">
        <h3 className="tituloProfile">Mis datos</h3>
          <div>
            <p>
              <span className="datosBold">Nombre:</span>{" "}
              {name}
            </p>
            <p>
              <span className="datosBold">Apellido:</span> {lastName}
            </p>
            <p>
              <span className="datosBold">DNI:</span>{" "}
              {!dni ? (
                <span className="sinCompletar">Sin completar.</span>
              ) : (
                dni
              )}
            </p>
            <p>
              <span className="datosBold">Domicilio:</span>{" "}
              {!data.direction.street ? (
                <span className="sinCompletar">Sin completar.</span>
              ) : (
                `${data.direction.street} ${data.direction.num}`
              )}
            </p>
            <p>
              <span className="datosBold">Telefono:</span>{" "}
              {!data.phoneNumber ? (
                <span className="sinCompletar">Sin completar.</span>
              ) : (
                data.phoneNumber
              )}
            </p>
            <p>
              <span className="datosBold">E-mail: </span>
              {data.mail}
            </p>
            {!doc && (
              <p>
                <span className="datosBold">Obra Social:</span>{" "}
                {!socialWork ? (
                  <span className="sinCompletar">Sin completar.</span>
                ) : (
                  socialWork
                )}
              </p>
            )}
          </div>
          <img src="/assets/avisador.png" alt="" />
        </div>
      </div>
      <div className="rightProfile">
        {!doc ? (
          <h4 className="proxTurnos">PRÓXIMOS TURNOS</h4>
        ) : (
          <h4 className="proxTurnos">PRÓXIMOS PACIENTES</h4>
        )}
        {!doc ? (
          appointments.length === 0 ? (
            <p className="turnos">No tenés turnos programados.</p>
          ) : (
            appointments.map((appointment) => {
              return (
                <AppointUser
                  key={appointment._id}
                  appointment={appointment}
                  deleteAppoint={deleteAppoint}
                />
              );
            })
          )
        ) : appointments.length === 0 ? (
          <p className="turnos">No tenés pacientes agendados esta semana.</p>
        ) : (
          <div>
            {drawAccordion("Lunes", lunes)}
            {drawAccordion("Martes", martes)}
            {drawAccordion("Miércoles", miercoles)}
            {drawAccordion("Jueves", jueves)}
            {drawAccordion("Viernes", viernes)}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
    patients: state.patients.patients,
    doctors: state.doctors.doctors,
  };
};

const mapDispatchToProps = {
  getAppointments: doctorActions.getAppointments,
  deleteAppointment: doctorActions.deleteAppointment,
  confirmFormMail: patientActions.confirmFormMail,
  deleteAllAppointmentByDoctor: doctorActions.deleteAllAppointmentByDoctor,
  deleteProfileDoctor: doctorActions.deleteProfileDoctor,
  logOut: userActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
