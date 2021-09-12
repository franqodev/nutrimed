import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import userActions from "../redux/actions/userActions"

const Footer = ({logOut,valid}) => {

   const outHandler = () => {
      logOut()
   }

    return (
        <footer>
            <div>
               <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'><img src='/assets/instagram.png' alt=""/></a>
               <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'><img src='/assets/facebook.png' alt=""/></a>
               <a href='https://twitter.com/' target='_blank' rel='noreferrer'><img src='/assets/twitter.png' alt=""/></a>
               <a href='https://ar.linkedin.com/' target='_blank' rel='noreferrer'><img src='/assets/linkedin.png' alt=""/></a>
            </div>
            <div className="footerNavbar">
            <ul>
               <li>
                  <NavLink exact to="/" onClick={() => window.scrollTo(0, 0)}>
                     <p>HOME</p>
                  </NavLink>
               </li>
               {!valid && <li>
                  <NavLink to="/signup" onClick={() => window.scrollTo(0, 0)}>
                     <p>CREAR CUENTA</p>
                  </NavLink>
               </li>}
               {!valid && <li>
                  <NavLink to="/signin" onClick={() => window.scrollTo(0, 0)}>
                     <p>INGRESAR</p>
                  </NavLink>
               </li>}
               {valid && <li>
                  <NavLink to="/profile" onClick={() => window.scrollTo(0, 0)}>
                     <p>PERFIL</p>
                  </NavLink>
               </li>}
               {valid && <li>
                  <NavLink onClick={outHandler} to="/" onClick={() => window.scrollTo(0, 0)}>
                     <p>SALIR</p>
                  </NavLink>
               </li>}
            </ul>
            </div>
            <p>© Copyright 2021 | NutriMed. </p>
        </footer>
    )
}

const mapStateToProps = (state) => {
   return {
      valid: state.users.token,
      user: state.users.dataUser
   }
}

const mapDispatchToProps = {
   logOut: userActions.logOut
}


export default connect(mapStateToProps, mapDispatchToProps)(Footer)