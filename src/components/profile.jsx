import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import iconChangePassword from "../asset/changePassword.png";
import UserService from "../services/user.service";
import moment from 'moment';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
const validateDate = (value) => {
  if (
    !value.match(
      "[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])"
    )
  ) {
    return (
      <div className="alert alert-danger" role="alert">
        The BirthDay must be right format : YYYY-MM-DD 
      </div>
    );
  } 
};

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.onChangedFullName = this.onChangedFullName.bind(this);
    this.onChangedEmail = this.onChangedEmail.bind(this);
    this.onChangedAddress = this.onChangedAddress.bind(this);
    this.onChangedGender = this.onChangedGender.bind(this);
    this.onChangedPhoneNumber = this.onChangedPhoneNumber.bind(this);
    this.onChangedBirthDay = this.onChangedBirthDay.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    this.onChangeImagePath = this.onChangeImagePath.bind(this);
    this.state = {
      user: {
        username: undefined,
        expiredDate: undefined,
        enable: undefined,
        details: {
          id: undefined,
          fullName: undefined,
          email: undefined,
          address: undefined,
          gender: undefined,
          phoneNumber: undefined,
          birthDay: undefined,
        },
        roleDTO: {
          roleId: undefined,
          roleName: undefined,
        },
      },
      avatar: undefined,
      currentUser: undefined,
      startDate: new Date(),
      image: null,
    };
  }
  componentDidMount() {
 
    this.getUserById();
  }
  getUserById() {
    let currentUser = AuthService.getCurrentUser();
    UserService.getUserById(currentUser.userId).then((response) => {
      let userDT0 = response.data;
      let profileDTO = response.data.userProfileDTO;
      this.setState({
        currentUser: currentUser,
        user: userDT0,
        username: userDT0.username,
        expiredDate: userDT0.expiredDate,
        enable: userDT0.enable,
        details: profileDTO,
        id: profileDTO.id,
        fullName: profileDTO.fullName,
        avatar: profileDTO.avatar,
        email: profileDTO.email,
        address: profileDTO.address,
        gender: profileDTO.gender,
        phoneNumber: profileDTO.phoneNumber,
        birthDay: profileDTO.birthDay,
        loading: false,
        message: "",
      });
    });
  }
  handleUpdateProfile(event) {
    event.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let imageTemp = "";
      if (this.state.image) {
        imageTemp = this.state.image;
      } else {
        imageTemp = this.state.avatar;
      }
      let birthDay = moment(this.state.birthDay).format();
      console.log(birthDay);
      let userRequest = {
        username: this.state.username,
        expiredDate: this.state.expiredDate,
        enable: this.state.enable,
        userProfileDTO: {
          id: this.state.id,
          fullName: this.state.fullName,
          avatar: imageTemp,
          email: this.state.email,
          address: this.state.address,
          gender: this.state.gender,
          phoneNumber: this.state.phoneNumber,
          birthDay: birthDay,
        },
      };
      UserService.updateProfile(
        this.state.currentUser.userId,
        userRequest
      ).then(
        () => {
          alert("updateProfile success");
          window.location.reload();
        },
        (error) => {
          const resMessage = error.response.data.message;
          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  onChangedFullName(event) {
    this.setState({
      fullName: event.target.value,
    });
  }
  onChangedEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  onChangedAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }
  onChangedGender(event) {
    this.setState({
      gender: event.target.value,
    });
  }
  onChangedPhoneNumber(event) {
    this.setState({
      phoneNumber: event.target.value,
    });
  }
  onChangedBirthDay(event) {
    this.setState({
      birthDay: event.target.value,
    });
  }
  onChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };
  onChangeImagePath(event) {
    let image = document.getElementById("imagePath");
    image.style.display = "inline";
    image.src = URL.createObjectURL(event.target.files[0]);
    this.setState({
      image: event.target.value,
    });
  }

  render() {
    return (
      <div className="container col-md-5">
        <div className="navbar-nav ml-auto ">
          <li className="nav-item">
            <a className="nav-link active" href="/changePassword">
              <img src={iconChangePassword} width="30" height="30" alt="" />
              Change Password
            </a>
          </li>
        </div>
        <div className="card card-container col-md-12">
          <Form
            onSubmit={this.handleUpdateProfile}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              Avatar
              {this.state.avatar === null ? (
                <div>
                  <img
                    id="imagePath"
                    width="300"
                    height="300"
                    style={{ display: "none" }}
                    className="profile-img-card"
                    alt="profile-img"
                  />
                  <br />
                  <Input
                    type="file"
                    accept="image/*"
                    name="imagePath"
                    value=""
                    id="file"
                    onChange={this.onChangeImagePath}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      "http://localhost:3000/images/avatar/" + this.state.avatar
                    }
                    id="imagePath"
                    width="300"
                    height="300"
                    alt=""
                    className="profile-img-card"
                  />
                  <br />
                  <Input
                    type="file"
                    accept="image/*"
                    name="imagePath"
                    value=""
                    id="file"
                    onChange={this.onChangeImagePath}
                  />
                </div>
              )}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <Input
                type="text"
                className="form-control"
                name="fullName"
                value={this.state.fullName}
                onChange={this.onChangedFullName}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangedEmail}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={this.state.address}
                onChange={this.onChangedAddress}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <Input
                type="text"
                className="form-control"
                name="gender"
                value={this.state.gender}
                onChange={this.onChangedGender}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.onChangedPhoneNumber}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthDay">BirthDay</label>
              <Input
                type="text"
                className="form-control"
                name="birthDay"
                value={this.state.birthDay}
                onChange={this.onChangedBirthDay}
                validations={[required, validateDate]}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Update</span>
              </button>
            </div>
          

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
