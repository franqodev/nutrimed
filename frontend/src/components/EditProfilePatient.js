import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import doctorActions from "../redux/actions/doctorActions"


const EditProfilePatient = (props) => {
    // const mail = props.user.data.mail
    const [valueIn, setValueIn] = useState(true)
    const [actPat, setActPat] = useState({
        dni: "",
        data: {
            direction: {
                street: "",
                num: "",
                city: ""
            },
            // mail,
            phoneNumber: "",
        },
        socialWork: "",
    })




   const inputPreview = useRef(null)
   const preview = useRef(null)

   const inputHandler = () => {
      const $inputPrewiew = inputPreview.current.files[0]
      const $preview = preview.current
      const readFile = new FileReader()

      if ($inputPrewiew) {
         readFile.readAsDataURL($inputPrewiew)
         readFile.onloadend = function () {
            $preview.src = readFile.result
         }
      } else {
         $preview.src = ""
      }
   }


   const addDocHandler = (e) => {
       
      if (e.target.name === "street"){
          setActPat({...actPat, data: {direction: {...actPat.data.direction, street: e.target.value}}})
      }else if (e.target.name === "phoneNumber"){
          setActPat({...actPat, data: {...actPat.data, phoneNumber: e.target.value}})
      }else if (e.target.name === "num"){
          setActPat({...actPat, data: {direction: {...actPat.data.direction, num: e.target.value}}})
      }else if (e.target.name === "city"){
          setActPat({...actPat, data: {direction: {...actPat.data.direction, city: e.target.value}}})
      }else  {
          setActPat({...actPat, [e.target.name]: e.target.value})
      }
  }



const submitHandler = () => {
   props.upgradePat(props.user.doc, actPat, props.token)
}


   const allSocialWork = [
      "MEDICAL",
      "SWISS",
      "APMA",
      "OSDE",
      "CARA",
      "UDE",
      "OSPIM",
      "PREVENCIOON SALUD",
      "SANCOR",
      "LIAW",
   ]
   return (

      <div className="dataClient">
         <h2>Termina de completar tus datos</h2>
         <form id="form">
            <label>DNI</label>
            <input type="number" placeholder="DNI" name="dni" onChange={addDocHandler} defaultValue={actPat.dni}/>
            <input type="text" placeholder="Teléfono" name="phoneNumber" onChange={addDocHandler} defaultValue={actPat.data.phoneNumber}/>
            <label>Dirección</label>
            <input type="text" placeholder="Calle" name="street" onChange={addDocHandler} defaultValue={actPat.data.direction.street}/>
            <input type="number" placeholder="Número" name="num" onChange={addDocHandler} defaultValue={actPat.data.direction.num}/>
            <input type="text" placeholder="Ciudad" name="city" onChange={addDocHandler} defaultValue={actPat.data.direction.city}/>
            
            <select id="inputState" name="socialWork" onChange={addDocHandler} defaultValue={actPat.socialWork}>
               <option>ELIGE TU OBRA SOCIAL: </option>
               {allSocialWork.map((social, index) => (
                  <option key={index}>{social}</option>
               ))}
               <option>Otro.</option>
            </select>
            <label>Tu historia clínica</label>
            <input
               ref={inputPreview}
               type="file"
               name="file"
               multiple
               onChange={inputHandler}
            ></input>
            <div className="preview">
               <img src="" ref={preview} alt="preview" />
            </div>
            <button type="submit" onClick={submitHandler}>
               ENVIAR
            </button>
         </form>

         <Link to="/patient">Volver al perfil</Link>
      </div>
   )
}


const mapStateToProps = (state) => {
   return {
       user: state.users.dataUser,
       token: state.users.token
   }
}

const mapDispatchToProps = {
   upgradePat: doctorActions.editProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient)

// import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const PatientCompleteData = () => {
//   const [dataPatient, setDataPatient] = useState();
//   const [clinicHistories, setClinicHistories] = useState(null);
//   const sendData = async (e) => {
//     e.preventDefault();
//     const f = new FormData();

//     for (let index = 0; index < clinicHistories.length; index++) {
//       f.append("clinicalHistory", clinicHistories[index]);
//     }

//     await axios
//       .post("http://localhost:4000/api/patient", f)
//       .then((res) => console.log(res))
//       .catch((error) => console.log(error));
//   };

//   const inputPreview = useRef(null);
//   const preview = useRef(null);

//   const inputHandler = () => {
//     const $inputPrewiew = inputPreview.current.files[0];
//     const $preview = preview.current;
//     const readFile = new FileReader();

//     if ($inputPrewiew) {
//       readFile.readAsDataURL($inputPrewiew);
//       readFile.onloadend = function () {
//         $preview.src = readFile.result;
//       };
//     } else {
//       $preview.src = "";
//     }
//   };

//   const obrasSociales = [
//     "MEDICAL",
//     "SWISS",
//     "APMA",
//     "OSDE",
//     "CARA",
//     "UDE",
//     "OSPIM",
//     "PREVENCIOON SALUD",
//     "SANCOR",
//     "LIAW",
//   ];
//   console.log();
//   return (
//     <div className="container">
//       <div className="signUpForm">
//         <img src="/assets/form.png" alt="" />
//         <h3>Por favor, completá tus datos</h3>
//         <form className="inputs">
//           <input type="text" placeholder="DNI"></input>
//           <input type="text" placeholder="Calle"></input>
//           <input type="text" placeholder="Número"></input>
//           <input type="text" placeholder="Ciudad"></input>
//           <select id="optionObraSocial" name="obraSocial">
//             <option defaultValue>Seleccioná tu obra social</option>
//             {obrasSociales.map((obra, index) => (
//               <option key={index}>{obra}</option>
//             ))}
//           </select>
//           <label>Tu historia clínica</label>
//           <input
//             id="fileCharger"
//             ref={inputPreview}
//             type="file"
//             name="file"
//             multiple
//             onChange={inputHandler}
//           ></input>
//           <div className="preview">
//             <img src="" ref={preview} alt="preview" />
//           </div>
//         </form>
//         <button type="submit" onClick={sendData}>
//           ENVIAR
//         </button>
//         <div>
//           <Link to="/patient">Volver al perfil</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientCompleteData;