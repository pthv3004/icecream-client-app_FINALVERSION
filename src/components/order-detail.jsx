import React, { Component } from "react";
import AuthService from "../services/auth.service";
import OrderService from "../services/order.service";
import { Dropdown, DropdownButton } from "react-bootstrap";
export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      order: {},
      user: {},
      userDetail: {},
      paymentMethod: '',
      status:'',
      orderDate:'',
      quantity: 0 ,
      totalCost: 0,
      orderId: 0

    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
    });
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
    }
    OrderService.getOrderById(this.state.id).then((res) => {
      this.setState({
        order: res.data,
        user: res.data.user,
        userDetail: res.data.user.userProfileDTO,
        paymentMethod: res.data.paymentMethod,
        status:res.data.status,
        orderDate:res.data.orderDate,
        quantity: res.data.quantity ,
        totalCost: res.data.totalCost,
        orderId:res.data.orderId
      });
    });
  }
  changeStatus=(status)=>{
    this.setState({
        status: status
    })
  }
  handleUpdate=()=>{
      let orderDTO = {
          orderId: this.state.orderId,
          user: this.state.user,
          paymentMethod: this.state.paymentMethod,
          status : this.state.status,
          orderDate: this.state.orderDate,
          quantity: this.state.quantity,
          totalCost: this.state.totalCost
      }
      OrderService.updateOrderStatus(this.state.orderId,orderDTO).then(
          ()=>{
              this.props.history.push('/order');
          }
      )
  }
  render() {
    return (
      <div className="container-fluid">
      <br/>
        <div className="card col-10 offset-1 ">
          <h3 className="text-center"> View Order Details</h3>
          <div className="card-body">
            <div className="row">
              <label className="font-weight-bold">OrderID: </label>
              <div className="ml-5">{this.state.order.orderId}</div>
            </div>
            <div className="row">
              <label className="font-weight-bold">Name: </label>
              <div className="ml-5">{this.state.userDetail.fullName}</div>
            </div>

            <div className="row">
              <label className="font-weight-bold"> Email: </label>
              <div className="ml-5">{this.state.userDetail.email}</div>
            </div>

            <div className="row">
              <label className="font-weight-bold">Contact: </label>
              <div className="ml-5">{this.state.userDetail.phoneNumber}</div>
            </div>

            <div className="row">
              <label className="font-weight-bold">Address: </label>
              <div className="ml-5">{this.state.userDetail.address}</div>
            </div>

            <div className="row">
              <label className="font-weight-bold">Total Cost: </label>
              <div className="ml-5">{this.state.order.totalCost}</div>
            </div>
            <div className="row">
              <label className="font-weight-bold">Paying Option: </label>
              <div className="ml-5">{this.state.order.paymentMethod}</div>
            </div>
            <div className="row">
              <label className="font-weight-bold">OrderDate: </label>
              <div className="ml-5">{this.state.order.orderDate}</div>
            </div>
            <div className="row">
              <label className="font-weight-bold">Status: </label>
              <div className="ml-5">
                <DropdownButton
                  className="col-md-5"
                  id="dropdown-item-button"
                  title={this.state.status}
                >
                  <Dropdown.Item
                    as="button"
                    onSelect={() => this.changeStatus("Processing")}
                  >
                    Processing
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    onSelect={() => this.changeStatus("Completed")}
                  >
                    Completed
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <div className="float-right">
                <button className="btn-success " onClick={()=>this.handleUpdate()}> Update </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
