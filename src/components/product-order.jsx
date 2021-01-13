import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";
import OrderService from "../services/order.service";
import { Dropdown, DropdownButton } from "react-bootstrap";
import FeedbackService from "../services/feedback.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
const validatePositiveNumber = (value) => {
  if (!value.match("^[1-9]+[0-9]*$")) {
    return (
      <div className="alert alert-danger" role="alert">
        This field must be positive number.
      </div>
    );
  }
};
export default class ProductOrder extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
    this.state = {
      id: this.props.match.params.id,
      productId: undefined,
      image: "",
      description: "",
      productName: "",
      price: 0,
      product: {},
      loading: false,
      message: "",
      user: {},
      fullName: "",
      email: "",
      address: "",
      phoneNumber: "",
      paymentMethod: "",
      status: "Processing",
      orderDate: "",
      quantity: 0,
      orderId: 0,
      successful: false,
      feedbacks: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
      if (user.role === "ROLE_ADMIN") {
        this.props.history.push("/profile");
        window.location.reload();
      }
      this.getProductById();
      this.getUserById(user.userId);
      this.getFeedbackByProductId();
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  getFeedbackByProductId() {
    FeedbackService.getFeedbackByProductId(this.state.id).then((response) => {
      this.setState({
        feedbacks: response.data,
      });
    });
  }
  getUserById(id) {
    UserService.getUserById(id).then((res) => {
      this.setState({
        user: res.data,
        fullName: res.data.userProfileDTO.fullName,
        email: res.data.userProfileDTO.email,
        address: res.data.userProfileDTO.address,
        phoneNumber: res.data.userProfileDTO.phoneNumber,
      });
      if (res.data.userProfileDTO.fullName === null) {
        alert("You must update your profile to order");
        this.props.history.push("/profile");
        window.location.reload();
      }
    });
  }
  getProductById() {
    ProductService.getProductById(this.state.id).then((res) => {
      this.setState({
        productId: res.data.productId,
        image: res.data.image,
        description: res.data.description,
        productName: res.data.productName,
        author: res.data.author,
        price: res.data.price,
        product: res.data,
      });
    });
  }
  changePaymentMethod = (payingMethod) => {
    this.setState({
      paymentMethod: payingMethod,
    });
  };
  onChangedFullName = (event) => {
    this.setState({
      fullName: event.target.value,
    });
  };
  onChangedEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  onChangedAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  onChangedPhoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };
  onChangedQuantity = (event) => {
    this.setState({
      quantity: event.target.value,
    });
  };
  handleSubmitOrder(event) {
    event.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let orderRequest = {
        orderId: this.state.orderId,
        user: this.state.user,
        paymentMethod: this.state.paymentMethod,
        status: this.state.status,
        orderDate: this.state.orderDate,
        quantity: this.state.quantity,
        productDTO: this.state.product,
      };
      OrderService.createOrder(orderRequest).then(
        (response) => {
          const resMessage = response.data.message;
          this.setState({
            message: resMessage,
            loading: false,
            successful: true,
          });
          alert(resMessage);
          window.location.reload();
        },
        (error) => {
          const resMessage = error.response.data.message;
          this.setState({
            loading: false,
            message: resMessage,
            successful: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="card col-6 float-left">
          <div className="card-body">
            <img
              src={"http://localhost:3000/images/products/" + this.state.image}
              className="card-img-top"
              alt="..."
              height="350"
              width="100"
            />
            <h5 className="card-title">{this.state.productName}</h5>
            <p className="card-text">{this.state.description}</p>
            <p className="card-text">
              <small className="text-success font-weight-bold">
                {this.state.price}$
              </small>
            </p>
            <hr />

            <div className="card">
              <div className="card-header">
                {" "}
                <h6>Feedback</h6>
              </div>
              {this.state.feedbacks.length > 0 &&
                this.state.feedbacks.map((feedback) => (
                  <div className="card-body">
                    <span className="font-weight-bold">
                      {feedback.fullName}:
                    </span>
                    &nbsp; &nbsp;&nbsp;
                    <span className="small">{feedback.content}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="card col-6 float-right">
          <Form
            onSubmit={this.handleSubmitOrder}
            ref={(c) => {
              this.form = c;
            }}
          >
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
                type="text"
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
              <label htmlFor="phoneNumber">Contact</label>
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
              <label htmlFor="quantity">Quantity</label>
              <Input
                type="number"
                className="form-control"
                name="quantity"
                max={this.state.product.quantity}
                value={this.state.quantity}
                onChange={this.onChangedQuantity}
                validations={[required, validatePositiveNumber]}
              />
            </div>
            <div>
              <label>Paying Method: </label>
              <div className="ml-5">
                <DropdownButton
                  required
                  className="col-md-5"
                  id="dropdown-item-button"
                  title={
                    this.state.paymentMethod === ""
                      ? "Select Payment Method"
                      : this.state.paymentMethod
                  }
                >
                  <Dropdown.Item
                    onSelect={() => this.changePaymentMethod("Visa")}
                  >
                    Visa
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={() => this.changePaymentMethod("Master Card")}
                  >
                    Master Card
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={() => this.changePaymentMethod("Cash")}
                  >
                    Cash
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <br />
            <br />
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Submit</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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
