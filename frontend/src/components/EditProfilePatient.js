import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import patientActions from "../redux/actions/patientActions";
import userActions from "../redux/actions/userActions";

const EditProfilePatient = ({
  user,
  token,
  getAvatars,
  getSocialWork,
  editProfile,
  history,
}) => {
  const { data, dni, src, socialWork, doc } = user;
  const { direction, phoneNumber } = data;
  const email = user.data.mail;
  const [validEdit, setValidEdit] = useState(false);
  const [allSocialWork, setAllSocialWork] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [previewImg, setPreviewImg] = useState(src);
  const [textError, setTextError]= useState('')
  const [actPat, setActPat] = useState({
    dni: dni,
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
    socialWork: socialWork,
  });
  

  useEffect(() => {
    async function getAllAvatars() {
      let response = await getAvatars();
      if (response.success) {
        setAvatars(response.res);
      }
    }
    getAllAvatars();
    getSocialWork().then((res) => setAllSocialWork(res.res));

    return false;
    // eslint-disable-next-line
  }, []);

  const addDocHandler = (e) => {
    if (e.target.name === "street" || e.target.name === "num" || e.target.name === "city") {
      setActPat({
        ...actPat,
        data: {
          ...actPat.data,
          direction: { ...actPat.data.direction, [e.target.name]: e.target.value }
        }
      })
    } else if (e.target.name === "phoneNumber") {
      setActPat({
        ...actPat,
        data: { ...actPat.data, phoneNumber: e.target.value }
      })
    } else {
      setActPat({ ...actPat, [e.target.name]: e.target.value })
    }
  }

  const editHandler = () => {
    setValidEdit(!validEdit);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = () => {
    editProfile(doc, actPat, token).then((res) => {
      if (res.success) {
        history.push("/profile");
      }else{
        setTextError('No se pudieron actualizar los datos, intentelo mas tarde')
      }
    });
  };

  const inputValue = (e) => {
    setPreviewImg(e.target.value);
  };
  const optionSocialWork=allSocialWork.map((social, index) => <option key={index}>{social}</option>)
  return (
    <div className="container">
      <div className="grayContainer">
        <img src="/assets/form.png" alt="" />
        <h3>Por favor, completá tus datos</h3>
        {!validEdit ? (
          <span className="editProfile" onClick={editHandler}>
            Editar
          </span>
        ) : (
          <Link to="/profile">Cancelar y volver al perfil</Link>
        )}
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
              defaultValue={data.direction.city}
              disabled={validEdit ? false : true}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="forError">
          {<select
                  id="optionObraSocial"
                  name="socialWork"
                  onChange={addDocHandler}
                  defaultValue={socialWork}
                  disabled={validEdit ? false : true}
               >
                  <option>Seleccioná tu obra social </option>
                  {validEdit ? optionSocialWork
                  : <option defaultValue>{socialWork}</option>}
                  <option>Otra</option>
               </select>}
          </div>
          {src.length && validEdit && (
            <div className="containerPreview">
              <div
                className="preview"
                style={{
                  backgroundImage: `url("${previewImg}")`,
                }}
              ></div>

              <div className="thumbNails">
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
                      name="src"
                      onClick={addDocHandler}
                      defaultValue={div.src}
                    ></input>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
        {validEdit && <button onClick={submitHandler}>Actualizar datos</button>}
        <div>
          <Link to="/profile">Volver al perfil</Link>
        </div>
        <span className='red'>{textError}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  editProfile: userActions.editProfile,
  getAvatars: patientActions.getAvatars,
  getSocialWork: patientActions.getSocialWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient);
