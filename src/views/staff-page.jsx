import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class StaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      if (user.role !== "ROLE_STAFF") {
        this.props.history.push("/login");
        window.location.reload();
      }
      this.props.history.push("product");
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  render() {
    return (
      <div>
        <ul className="nav">
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
      </div>
    );
  }
}
