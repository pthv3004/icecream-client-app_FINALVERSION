import React, { Component } from "react";
import UserService from "../services/user.service";
import { Modal, Dropdown, DropdownButton } from "react-bootstrap";
import AuthService from "../services/auth.service";
export default class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.onChangedSearchValue = this.onChangedSearchValue.bind(this);
    this.state = {
      users: [],
      detailState: false,
      enable: undefined,
      expiredDate: "",
      userId: "",
      username: "",
      roleId: undefined,
      roleName: "",
      address: "",
      avatar: "",
      birthDay: "",
      email: "",
      fullName: "",
      gender: "",
      profileId: undefined,
      phoneNumber: "",
      message: "",
      loading: false,

      modalId: null,
    };
  }
  handleShow = (id) => {
    this.loadUserById(id);
    this.setState({ detailState: true, modalId: id });
  };
  handleClose = () => {
    this.setState({ detailState: false });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user.role !== "ROLE_ADMIN") {
      this.props.history.push("/login");
      window.location.reload();
    }
    UserService.getAllUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }
  loadUserById = (id) => {
    UserService.getUserById(id).then((response) => {
      const userDTO = response.data;
      const profileDTO = response.data.userProfileDTO;
      this.setState({
        searchValue: "",
        username: userDTO.username,
        expiredDate: userDTO.expiredDate,
        enable: userDTO.enable,
        profileId: profileDTO.id,
        fullName: profileDTO.fullName,
        avatar: profileDTO.avatar,
        email: profileDTO.email,
        address: profileDTO.address,
        gender: profileDTO.gender,
        phoneNumber: profileDTO.phoneNumber,
        birthDay: profileDTO.birthDay,
        roleName: userDTO.roleDTO.roleName,
        loading: false,
        message: "",
      });
    });
  };
  changeStatus = (status) => {
    this.setState({
      enable: status,
    });
  };
  handleUpdate(id) {
    let userRequest = {
      username: this.state.username,
      expiredDate: this.state.expiredDate,
      enable: this.state.enable,
      userProfileDTO: {
        id: this.state.id,
        fullName: this.state.fullName,
        avatar: this.state.avatar,
        email: this.state.email,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        birthDay: this.state.birthDay,
      },
    };
    UserService.updateUser(id, userRequest).then(() => {
      window.location.reload();
    });
  }
  onChangedSearchValue  (event)  {
    this.setState({
      searchValue: event.target.value,
    });
  };
  searchUser = () =>{
    UserService.searchUser(this.state.searchValue).then((res) => {
      this.setState({
        users: res.data
      });
    })
  }
  render() {
    return (
      <div className="container-fluid">
      <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="/user">
              Users Management
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/faq">
              FAQ & Feedback Management
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/order">
              Orders Management
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/product">
              Products Management
            </a>
          </li>
        </ul>
        <h2 className="text-center">Users List</h2>
        <div className="form-group">
          <label htmlFor="searchValue">Username</label>
          <input
            type="text"
            className="form-control w-25"
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.onChangedSearchValue}
          />
          <button className="btn btn-primary" onClick={()=>this.searchUser()}>Search</button>
        </div>
        <br />
        <div className="row">
          <table className="table table-tripped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Expired Date</th>
                <th>Enabled</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) =>
                user.roleDTO.roleId !== 3 ? (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.userProfileDTO.fullName}</td>
                    <td>{user.userProfileDTO.email}</td>
                    <td>{user.expiredDate}</td>
                    <td>{user.enable.toString()}</td>
                    <td>
                      {user.userProfileDTO.id === 0 ? null : (
                        <button
                          className="button-indent btn-info"
                          variant="primary"
                          onClick={() => this.handleShow(user.id)}
                        >
                          Details
                        </button>
                      )}
                      <Modal
                        onHide={this.handleClose}
                        show={this.state.detailState}
                      >
                        <Modal.Header>
                          <Modal.Title>
                            <span className="text-success">
                              {this.state.fullName.toLocaleUpperCase()}'s
                            </span>{" "}
                            Details
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <span className="font-weight-bold col-md-10">
                            Username:{" "}
                          </span>
                          <span className="col-md-10">
                            {this.state.username}
                          </span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Full Name:{" "}
                          </span>
                          <span className="col-md-10">
                            {this.state.fullName}
                          </span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Email:{" "}
                          </span>
                          <span className="col-md-10">{this.state.email}</span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Gender:{" "}
                          </span>
                          <span className="col-md-10">{this.state.gender}</span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Address:{" "}
                          </span>
                          <span className="col-md-10">
                            {this.state.address}
                          </span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Phone Number:{" "}
                          </span>
                          <span className="col-md-10">
                            {this.state.phoneNumber}
                          </span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Role Name:{" "}
                          </span>
                          <span className="col-md-10">
                            {this.state.roleName}
                          </span>
                          <hr />
                          <span className="font-weight-bold col-md-10">
                            Enabled:{" "}
                          </span>
                          <span>
                            <DropdownButton
                              className="col-md-5"
                              id="dropdown-item-button"
                              title={
                                this.state.enable === true ? "true" : "false"
                              }
                            >
                              <Dropdown.Item
                                as="button"
                                onSelect={() => this.changeStatus(false)}
                              >
                                false
                              </Dropdown.Item>
                              <Dropdown.Item
                                as="button"
                                onSelect={() => this.changeStatus(true)}
                              >
                                true
                              </Dropdown.Item>
                            </DropdownButton>
                          </span>
                          <hr />
                          <button
                            className="float-right"
                            variant="secondary"
                            onClick={this.handleClose}
                          >
                            Close
                          </button>
                          <button
                            className="float-right"
                            variant="danger"
                            onClick={() =>
                              this.handleUpdate(this.state.modalId)
                            }
                          >
                            Update
                          </button>
                        </Modal.Body>
                      </Modal>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
