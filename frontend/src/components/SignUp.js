import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import userActions from "../redux/actions/userActions";
import patientActions from "../redux/actions/patientActions";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const SignUp = ({ signUpUser, getAvatars }) => {
  let valor = null;
  const [valueIn, setValueIn] = useState("pat");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState({
    errorOne: false,
    errorTwo: false,
    errorT: false,
  });
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    data: { mail: "" },
    password: "",
    passwordAdm: "",
    validPassword: "",
    src: "",
    doc: false,
  });
  const [previewImg, setPreviewImg] = useState(
    "https://i.postimg.cc/Hn7rq5TV/avatar5.png"
  );
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function getAllAvatars() {
      let response = await getAvatars();
      if (response.success) {
        setAvatars(response.res);
      } 
    }
    getAllAvatars();
    return false;
    // eslint-disable-next-line
  }, []);
  
  const inputValue = (e) => {
    setPreviewImg(e.target.value);
  };

  const validFields = (field) => {
    for (var i in field) {
      if (
        !field[i].length &&
        !Object.values([i]).includes("data") &&
        !Object.values([i]).includes("passwordAdm")
      ) {
        valor = valor + 1;
        (valor > 1 || errors.length > 1) && setError({ errorOne: true });
      }
    }
    return valor;
  };


  const responseGoogle = (res) => {
    let logWithGoogle = {
      name: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      data: { mail: res.profileObj.email },
      password: res.profileObj.googleId,
      src: res.profileObj.imageUrl,
      google: true,
    };
    signUpUser(logWithGoogle).then((res) => {
      if (!res.success) {
        setError({ errorT: true });
        setErrors([{ message: res.res }]);
      }
    });
  };

  const submitHandler = () => {
    validFields(newUser);
    if (valueIn === "prof") {
      newUser.doc = true;
    } else {
      newUser.doc = false;
    }
    if (valor < 2 && !errors.message) {
      signUpUser({ ...newUser, doc: newUser.doc }).then((res) => {
        if (!res.success) {
          setError({ errorOne: true });
          typeof res.res === "string"
            ? res.res.includes("uso")
              ? setErrors([{ message: res.res }]) &&
                setError({ errorTwo: true })
              : setErrors([{ message: "Ups! Intentalo más tarde." }])
            : setErrors(res.res);
        }
      });
    } else if (valor > 1) {
      setErrors([{ message: "Debes completar este dato." }]);
    } else setErrors([{ message: "" }]);
  };

  const addUserHandler = (e) => {
    setError({ errorOne: false });
    setError({ errorT: false });
    !mensaje6 && setErrors([{ message: "" }]);
    if (e.target.name === "data") {
      setNewUser({ ...newUser, data: { mail: e.target.value } });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const validInputHandler = (e) => {
    setValueIn(e.target.value);
  };

  const verifyPassword = (e) => {
    if (e.target.value !== newUser.password) {
      setErrors([{ message: "validar" }]);
      setError({ errorT: true });
    } else {
      setError({ errorT: false });
      setErrors([{ message: "" }]);
    }
  };

  let mensaje1 = null;
  let mensaje2 = null;
  let mensaje3 = null;
  let mensaje4 = null;
  let mensaje5 = null;
  let mensaje6 = null;
  let mensaje7 = null;
  let mensaje8 = null;

return(
  <>
    {errors.forEach((newError) =>
          newError.message.includes("dato")
            ? (mensaje1 = newError.message)
            : newError.message.includes("nombre")
            ? (mensaje2 = newError.message)
            : newError.message.includes("apellido")
            ? (mensaje3 = newError.message)
            : newError.message.includes("email")
            ? (mensaje4 = newError.message)
            : newError.message.includes("contraseña")
            ? (mensaje5 = newError.message)
            : newError.message.includes("validar")
            ? (mensaje6 = "Las contraseñas deben coincidir.")
            : newError.message.includes("uso")
            ? (mensaje7 = newError.message)
            : newError.message.includes("uso")
            && (mensaje8 = newError.message)
        )}
        <ReactTooltip id="buttonError1" place="top" effect="solid" className={(!mensaje1 && !mensaje2) ? 'notError' : "toolTip"} arrowColor='transparent'>
          {mensaje1 ? mensaje1 : mensaje2 && mensaje2}
        </ReactTooltip>
        <ReactTooltip id="buttonError2"  place="top" effect="solid" className={(!mensaje1 && !mensaje3) ? 'notError' : "toolTip"} arrowColor='transparent'>
          {mensaje1 ? mensaje1 : mensaje3 && mensaje3}
        </ReactTooltip>
        <ReactTooltip
        id="buttonError3"
        place="top"
        effect="solid"
        className={(!mensaje1 && !mensaje4 && !mensaje7) ? 'notError' : "toolTip"}
        arrowColor='transparent'
      >
       
        {mensaje1 ? mensaje1 : mensaje4 ? mensaje4 : mensaje7}
      </ReactTooltip>
      <ReactTooltip
        id="buttonError4"
        place="top"
        effect="solid"
        className={(!mensaje1 && !mensaje5) ? 'notError' : "toolTip"}
        arrowColor='transparent'
      >
        
        {mensaje1 ? mensaje1 : mensaje5 && mensaje5}
      </ReactTooltip>
      <ReactTooltip
        id="buttonError5"
        place="top"
        effect="solid"
        className={(!mensaje1 && !mensaje6) ? 'notError' : "toolTip"}
        arrowColor='transparent'
      >
        
        {mensaje1 ? mensaje1 : mensaje6 && mensaje6}
      </ReactTooltip>
      <ReactTooltip
        id="buttonError6"
        place="top"
        effect="solid"
        className={!mensaje1 ? 'notError' : "toolTip"}
        arrowColor='transparent'
      >
       
        {mensaje1 ? mensaje1 : "Debes seleccionar una foto."}
      </ReactTooltip>
      <ReactTooltip
        id="buttonError7"
        place="top"
        effect="solid"
        className={!mensaje7 ? 'notError' : "toolTip"}
        arrowColor='transparent'
      >
        
        {mensaje7}
      </ReactTooltip>
      <div className="container">
        <div className="grayContainer">
          <img src="/assets/form.png" alt="" />
            <h3>¿Te registrarás como paciente o profesional?</h3>
            <div className="radio">
            <div>
              <p>Paciente </p>
              <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                defaultValue="pat"
                defaultChecked
              />
            </div>
            <div>
            <p>Profesional </p>
              <input
                onClick={validInputHandler}
                type="radio"
                name="buttonRol"
                defaultValue="prof"
              />
            </div>
          </div>
          <div className="inputs">
          <div className="forError">
              <input
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={addUserHandler}
                defaultValue={newUser.name}
              />
              <div data-tip
                  data-for="buttonError1"
                  className='cross2'
                  >
                  {error.errorOne &&
                      (!newUser.name.length || mensaje2) &&
                      !mensaje8 &&
                <img className='cross2'
                  src="/assets/cross2.png"
                  alt="..."
                />
              }
              </div>
              
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Apellido"
                name="lastName"
                onChange={addUserHandler}
                defaultValue={newUser.lastName}
              />
              <div data-tip
                  data-for="buttonError2" className='cross2'>
              {(error.errorOne && (!newUser.lastName.length || mensaje3) && !mensaje8)
               &&  <img
                  className='cross2'
                  src="/assets/cross2.png"
                  alt="..."
                />
              }
              </div>
            </div>
            <div className="forError">
              <input
                type="email"
                placeholder="E-mail"
                name="data"
                onChange={addUserHandler}
                defaultValue={newUser.data.mail}
              />
              <div data-tip
                  data-for="buttonError3" className='cross2'>
              {(error.errorOne && (!newUser.data.mail.length || mensaje4 || mensaje7) && !mensaje8)
               && <img
                  className='cross2'
                  src="/assets/cross2.png"
                  alt="..."
                />
              }
              </div>
            </div>
            <div className="forError">
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={addUserHandler}
                defaultValue={newUser.password}
              />
              <div data-tip
                  data-for="buttonError4" className='cross2'>
              {(error.errorOne && (!newUser.password.length || mensaje5) && !mensaje8) &&
                <img
                  className='cross2'
                  src="/assets/cross2.png"
                  alt="..."
                />
              }
              </div>
            </div>
            <div className="forError">
              <input type="password" placeholder="Repetí tu contraseña" name="validPassword" onBlur={verifyPassword} onChange={addUserHandler} defaultValue={newUser.validPassword}/>
              <div data-tip data-for="buttonError5" className='cross2'>
                  {(((error.errorT && !newUser.validPassword.length && mensaje6) ||  mensaje6) && !mensaje8 )
                  && <img className='cross2' src="/assets/cross2.png" alt="..."/>}
              </div>
            </div>
            {valueIn === 'prof' && <div className="forError">
                <input
                  type="text"
                  placeholder="URL de imagen"
                  name={valueIn === "prof" ? "src" : ""}
                  onChange={addUserHandler}
                  defaultValue={newUser.src}
                  required={valueIn === "prof" ? true : false}
                  />
                </div>}
            {valueIn === 'prof' && 
            <div className="forError">
              <input
                type="password"
                placeholder="Clave profesional NutriMed"
                name="passwordAdm"
                onChange={addUserHandler}
                defaultValue={newUser.passwordAdm}
                required={valueIn === "prof" ? true : false}
              />
              <div  data-tip
                  data-for="buttonError6" className='cross2'>
              { valueIn === "prof" && error.errorOne && !newUser.src && errors.length && !mensaje8
                && <img
                  className='cross2'
                  src="/assets/cross2.png"
                  alt="..."
                />
              }
              </div>
            </div>}
            {valueIn === "pat" && <h3>Elegí tu avatar para perfil</h3>}
          </div>
          <div className="containerPreview"
            style={{
              display: valueIn === "pat" ? "flex" : "none",
              justifyContent: valueIn === "pat" && "center",
              alignItems: valueIn === "pat" && "center",
              alignSelf: valueIn === "pat" && "center",
              flexWrap: valueIn === "pat" && "wrap",
              textAlign: valueIn === "pat" && "center",
            }}>
               {valueIn === "pat" && error.errorOne &&  !newUser.src &&  errors.length && !mensaje8
                &&  <img
                data-tip
                data-for="buttonError6"
                className='cross2'
                src="/assets/cross2.png"
                alt="..."
              />
            }
            <div
              className="preview"
              style={{
                backgroundImage: `url("${previewImg}")`,
              }}
            ></div>
            {<div
              className="thumbNails"
            >
              {avatars.map((div, index) => (
                <div
                  onClick={inputValue}
                  className="thumbNail"
                  key={index}
                  style={{
                    backgroundImage: `url("${div.src}")`,
                  }}
                >
                  <input
                    className="inputAvatar"
                    name={valueIn === "pat" ? "src" : ""}
                    onClick={addUserHandler}
                    defaultValue={div.src}
                  ></input>
                </div>
              ))}
            </div>}
           
        
          </div>
          <button onClick={submitHandler}>REGISTRARSE</button>
          {error.errorT && mensaje7
            &&  <img
              data-tip
              data-for="buttonError7"
              className='cross2'
              src="/assets/cross2.png"
              alt="..."
            />
          }
          {valueIn === "pat" && <div>
            <div>
              <GoogleLogin
                clientId="253529321992-379gqmcfo48ljen82l34v8fj58gvgk6v.apps.googleusercontent.com"
                buttonText="Registrarse con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>}
            <p>
              ¿Ya tenés cuenta? <Link to="/signin">¡Ingresá aquí!</Link>
            </p>
        </div>
      </div>
  </>
)
}


const mapStateToProps = (state) => {
  return {
    doctors: state.users.dataUser,
  };
};

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
  getAvatars: patientActions.getAvatars,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);