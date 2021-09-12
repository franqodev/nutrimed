import { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const EditProfileDoctor = ({token,user,editProfile,history}) => {
  const {data, dni, description, specialty, registration, src,socialWork} = user
  const { direction, phoneNumber } = data;
  const email = user.data.mail;
  const [valueIn, setValueIn] = useState(true);
  const [validEdit, setValidEdit] = useState(false);
  const [textError, setTextError]= useState('')
  const [actDoc, setActDoc] = useState({
    dni: dni,
    description: description,
    registration: registration,
    specialty: specialty,
    data: {
      direction: {
        street: direction.street,
        num: direction.num,
        city: direction.city,
      },
      mail: email,
      phoneNumber: phoneNumber,
   },
   src: src,
   socialwork: "",
})

  const editHandler = () => {
    setValidEdit(!validEdit);
  }
  
  const addDocHandler = (e) => {
    if (e.target.name === "street" || e.target.name === "num" || e.target.name === "city") {
      setActDoc({
        ...actDoc,
        data: {
          ...actDoc.data,
          direction: { ...actDoc.data.direction, [e.target.name]: e.target.value },
        }
      })
    } else if (e.target.name === "phoneNumber") {
      setActDoc({
        ...actDoc,
        data: { ...actDoc.data, phoneNumber: e.target.value },
      })
    } else {
      setActDoc({ ...actDoc, [e.target.name]: e.target.value });
    }
  }

  const socialWorkHandler = (e) => {
    setValueIn(!valueIn);
    setActDoc({ ...actDoc, [e.target.name]: valueIn });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  }

  const submitHandler = () => {
    editProfile(user.doc, actDoc, token).then((res) => {
      if (res.success) {
        history.push("/profile");
      }else{
        setTextError('No se pudieron actualizar los datos. Por favor, intentalo más tarde.')
      }
    });
  };
  return (
    <>
      <div className="container">
        <div className="grayContainer">
          <h3>Completá o actualizá tus datos</h3>
          {!validEdit ? <span id='editProfile' onClick={editHandler}>EDITAR</span> : <Link to = "/profile">Cancelar y volver al perfil</Link>}
          <form className="inputs">
            <div className="forError">
              <input
                type="text"
                placeholder="Ingrese DNI sin puntos ni espacios"
                name="dni"
                onChange={addDocHandler}
                defaultValue={dni}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Descripción"
                name="description"
                onChange={addDocHandler}
                defaultValue={description}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="N° de matrícula"
                name="registration"
                onChange={addDocHandler}
                defaultValue={registration}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Especialidad"
                name="specialty"
                onChange={addDocHandler}
                defaultValue={specialty}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Teléfono"
                name="phoneNumber"
                onChange={addDocHandler}
                defaultValue={data.phoneNumber}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Calle"
                name="street"
                onChange={addDocHandler}
                defaultValue={data.direction.street}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Número"
                name="num"
                onChange={addDocHandler}
                // defaultValue={actDoc.data.direction.num}
                defaultValue={data.direction.num}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Ciudad"
                name="city"
                onChange={addDocHandler}
                // defaultValue={actDoc.data.direction.city}
                defaultValue={
                  token ? data.direction.city : actDoc.data.direction.city
                }
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
            {<input
              type="text"
              placeholder="URL de imagen"
              name="src"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.city}
              defaultValue={src}
              disabled={validEdit ? false : true}
              onKeyPress={handleKeyPress}
            />}
            </div>
          </form>
          {validEdit && <><h4>¿Aceptás Obra Social? </h4>
          <div className="radio">
            <div>
              Si{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={true}
              />
            </div>
            <div>
              No{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={false}
              />
              </div>
            </div>
            <button onClick={submitHandler}>ACTUALIZAR DATOS</button></>}
               <div>
                  <Link to="/profile">Volver al perfil</Link>
               </div>
               <span className='red'>{textError}</span>
        </div>
        
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  editProfile: userActions.editProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDoctor);
