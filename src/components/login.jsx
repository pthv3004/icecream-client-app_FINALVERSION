import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from '../services/auth.service';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
export default class login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangedUsername = this.onChangedUsername.bind(this);
    this.onChangedPassword = this.onChangedPassword.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      username:'',
      password:'',

      loading: false,
      message: "",
      currentUser: null,
    };
  }
  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }
  /*check already login*/
  handleLoad(){
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
    })
    if(this.state.currentUser !== null){
      this.props.history.push("/profile");
    }

  }
  onChangedUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }
  onChangedPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  handleLogin(event) {
    event.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let loginRequest = 
      {username : this.state.username, password : this.state.password};
      AuthService.login(loginRequest).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage = error.response.data.message;
            this.setState({
                loading: false,
                message:resMessage
            });
        }
      );
    }
    else {
        this.setState({
            loading: false,
        });
    }
  }
  render() {
    return (
        <div className="container col-md-3">
        <div className="card card-container">
          <img
            src="https://file.tinnhac.com/resize/600x-/music/2017/12/28/riasgremory-d13a.png"
            alt="profile-img"
            className="profile-img-card"
            height = "300"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangedUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangedPassword}
                validations={[required]}
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
                <span>Login</span>
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
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
