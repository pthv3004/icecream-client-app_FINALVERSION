import React, { Component } from "react";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";
export default class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.viewOrderDetail = this.viewOrderDetail.bind(this);
    this.state = {
      role: undefined,
      orders: [],
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
      role : user.role
    });
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
    }
    OrderService.getAllOrders().then((response) => {
      this.setState({
        orders: response.data,
      });
    });
  }
  viewOrderDetail(id) {
    this.props.history.push("/view-order/" + id);
  }
  render() {
    return (
      <div className="container-fluid">
          <ul className="nav">
          {this.state.role === "ROLE_ADMIN" &&(
            <li className="nav-item">
            <a className="nav-link active" href="/user">
              Users Management
            </a>
          </li>
          )}
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

        <h2 className="text-center">Order List</h2>
        <br />
        <div className="row">
          <table className="table table-tripped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Buyer</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Total Cost</th>
                <th>Paying Option</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.user.userProfileDTO.fullName}</td>
                  <td>{order.user.userProfileDTO.email}</td>
                  <td>{order.user.userProfileDTO.phoneNumber}</td>
                  <td>{order.user.userProfileDTO.address}</td>
                  <td>{order.totalCost}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() => this.viewOrderDetail(order.orderId)}
                      className="btn btn-info"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
