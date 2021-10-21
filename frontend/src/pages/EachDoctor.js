import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import doctorActions from "../redux/actions/doctorActions";
import Reviews from "../components/Reviews";
import Score from "../components/Score";

class EachDoctor extends Component {
  state = {
    loading: { condition: true, text: "", back: "", gif:true},
    socket: null,
    newScore: [],
  };
  componentDidMount() {
    window.scroll(0, 0);
    this.props.getOneDoctorDB(this.props.match.params.id).then((res) => {
      res.success
        ? this.setState({ loading: { condition: false } })
        : this.setState({
            loading: {
              ...this.state.loading,
              text: "Ocurrió un error. Por favor, inténtalo de nuevo más tarde",
              back: "Volver a Home",
              gif:false
            },
          });
    })
  }
  render() {
    if (this.state.loading.condition) {
      return (
        <>
          (
          <div className="containerLoading">
            {this.state.loading.gif && <img src="/assets/loader.gif" alt='loading'/>}
            <h3>{this.state.loading.text}</h3>
            <Link to="/">{this.state.loading.back}</Link>
          </div>
        </>
      );
    }
    return (
      <div className="profile">
        <div className="leftProfile">
          <div
            className="doc"
            style={{ backgroundImage: `url('${this.props.doctor.src}')` }}
          ></div>
          <h4>
            {" "}
            {this.props.doctor.name} {this.props.doctor.lastName}
          </h4>
          <p>Matrícula: {this.props.doctor.registration}</p>
          <p>Especialidad: {this.props.doctor.specialty}</p>
        </div>
        <div className="docDescription">
          <div>
            <Score
              scoreArray={this.props.doctor.score}
              staff={false}
              valid={this.props.valid}
              doctorId={this.props.doctor._id}
            />
            <div className="univ">
              <img src="/assets/univ.png" alt="" />
              <p>{this.props.doctor.description}</p>
            </div>
          </div>
          <div>
            <Reviews
              reviews={this.props.doctor.review}
              doctorId={this.props.doctor._id}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateTopProps = (state) => {
  return {
    doctor: state.doctors.doctor,
    doctors: state.doctors.doctors,
    valid: state.users.token,
  };
};
const mapDispatchToProps = {
  getOneDoctorDB: doctorActions.getOneDoctorDB
};
export default connect(mapStateTopProps, mapDispatchToProps)(EachDoctor);
