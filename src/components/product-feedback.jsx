import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";
import FeedbackService from '../services/feedback.service';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};

export default class ProductFeedback extends Component {
  constructor(props) {
    super(props);
    this.handlePostFeedback = this.handlePostFeedback.bind(this);
    this.state = {
      successful: false,
      loading: false,
      message: "",
      productId: this.props.match.params.id,
      image: "",
      description: "",
      productName: "",
      author: "",
      price: 0,
      product: {},
      user: {},
      title: "",
      content: "",
      id: 0,
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
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
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
        alert("You must update your profile to Feedback");
        this.props.history.push("/profile");
        window.location.reload();
      }
    });
  }
  getProductById() {
    ProductService.getProductById(this.state.productId).then((res) => {
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
  onChangedTitle=(event)=>{
      this.setState({
          title: event.target.value
      })
  }
  onChangedContent=(event)=>{
      this.setState({
          content: event.target.value
      })
  }
  handlePostFeedback(event){
    event.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let feedbackRequest = {
        id: this.state.id,
        userDTO: this.state.user,
        content: this.state.content,
        title: this.state.title,
        productDTO: this.state.product
      };
      FeedbackService.save(feedbackRequest).then(
        (response) => {
          const resMessage = response.data.message
          this.setState({
            message: resMessage,
            loading: false,
            successful: true
          })
          },
        (error) => {
          const resMessage = error.response.data.message;
          this.setState({
            loading: false,
            message: resMessage,
            successful: false
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
            <h5 className="card-title">Name: {this.state.productName}</h5>
            <p className="card-text">Description: {this.state.description}</p>
            <p className="card-text">Author: {this.state.author}</p>
            <p className="card-text">
              <small className="text-success font-weight-bold">
                {this.state.price}$
              </small>
            </p>
          </div>
        </div>
        <div className="card col-6 float-right">
          <Form
            onSubmit={this.handlePostFeedback}
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
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.onChangedTitle}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                name="content"
                value={this.state.content}
                onChange={this.onChangedContent}
                validations={[required]}
              />
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
