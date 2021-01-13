import React, { Component } from "react";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";

export default class UserOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
    });
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        this.props.history.push("/login");
        window.location.reload();
      }
      OrderService.getAllOrdersByUserId(user.userId).then((res) => {
        this.setState({
          orders: res.data,
        });
      });
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          {this.state.orders &&
            this.state.orders.map((order) => (
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="card" key={order.orderId}>
                  <h3 className="text-center"> View Order Details</h3>
                  <div className="card-body">
                    <div className="row">
                      <label className="font-weight-bold">Name: </label>
                      <div className="ml-5">
                        {order.user.userProfileDTO.fullName}
                      </div>
                    </div>

                    <div className="row">
                      <label className="font-weight-bold"> Email: </label>
                      <div className="ml-5">
                        {order.user.userProfileDTO.email}
                      </div>
                    </div>

                    <div className="row">
                      <label className="font-weight-bold">Contact: </label>
                      <div className="ml-5">
                        {order.user.userProfileDTO.phoneNumber}
                      </div>
                    </div>

                    <div className="row">
                      <label className="font-weight-bold">Address: </label>
                      <div className="ml-5">
                        {order.user.userProfileDTO.address}
                      </div>
                    </div>

                    <div className="row">
                      <label className="font-weight-bold">Total Cost: </label>
                      <div className="ml-5 text-success">
                        {order.totalCost}$
                      </div>
                    </div>
                    <div className="row">
                      <label className="font-weight-bold">
                        Paying Option:{" "}
                      </label>
                      <div className="ml-5">{order.paymentMethod}</div>
                    </div>
                    <div className="row">
                      <label className="font-weight-bold">OrderDate: </label>
                      <div className="ml-5">{order.orderDate}</div>
                    </div>
                    <div className="row">
                      <label className="font-weight-bold">Status: </label>
                      <div className="ml-5">{order.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
