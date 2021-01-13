import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../services/user.service";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChangedOldPassword = this.onChangedOldPassword.bind(this);
    this.onChangedNewPassword = this.onChangedNewPassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.state = {
      currentUser: undefined,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      message: "",
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
    });
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let ChangePasswordRequest = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      };
      if (this.state.confirmPassword === this.state.newPassword) {
        UserService.changePassword(
          this.state.currentUser.userId,
          ChangePasswordRequest
        ).then(
          () => {
            this.props.history.push("/profile");
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
          message: "Confirm is not matched",
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  onChangedOldPassword(event) {
    this.setState({
      oldPassword: event.target.value,
    });
  }
  onChangedNewPassword(event) {
    this.setState({
      newPassword: event.target.value,
    });
  }
  onChangeConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value,
    });
  }
  render() {
    return (
      <div className="container col-md-3">
        <div className="card card-container">
          <Form
            onSubmit={this.handleChangePassword}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="oldPassword">Old Password</label>
              <Input
                type="password"
                className="form-control"
                name="oldPassword"
                value={this.state.oldPassword}
                onChange={this.onChangedOldPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <Input
                type="password"
                className="form-control"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.onChangedNewPassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChangeConfirmPassword}
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
                <span>Change Password</span>
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
