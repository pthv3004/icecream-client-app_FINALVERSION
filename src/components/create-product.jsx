import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CatalogueService from "../services/category.service";
import { Dropdown, DropdownButton } from "react-bootstrap";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangedAuthor = this.onChangedAuthor.bind(this);
    this.onChangedDescription = this.onChangedDescription.bind(this);
    this.onChangedProductName = this.onChangedProductName.bind(this);
    this.onChangedPrice = this.onChangedPrice.bind(this);
    this.onChangedQuantity = this.onChangedQuantity.bind(this);
    this.handleCreateProduct = this.handleCreateProduct.bind(this);
    this.onChangeImagePath = this.onChangeImagePath.bind(this);

    this.state = {
      productId: 0,
      image: "",
      description: "",
      productName: "",
      author: "",
      uploadDate: "",
      price: 0,
      quantity: 0,
      category: null,
      categories: [],
      enable: true,
      loading: false,
      message: "",
      successful: false,
    };
  }
  handleCreateProduct(event) {
    event.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let productDTO = {
        productId: this.state.productId,
        image: this.state.image,
        description: this.state.description,
        productName: this.state.productName,
        author: this.state.author,
        uploadDate: this.state.uploadDate,
        price: this.state.price,
        quantity: this.state.quantity,
        category: this.state.category,
        successful: false,
        enable: this.state.enable,
      };
      ProductService.createProduct(productDTO).then(
        () => {
          this.props.history.push("/product");
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
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
      if (user.role === "ROLE_USER") {
        this.props.history.push("/login");
        window.location.reload();
      }
      CatalogueService.getAllCatalogue().then((response) => {
        this.setState({
          categories: response.data,
        });
      });
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  onChangedDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }
  onChangedAuthor(event) {
    this.setState({
      author: event.target.value,
    });
  }
  onChangedPrice(event) {
    this.setState({
      price: event.target.value,
    });
  }
  onChangedProductName(event) {
    this.setState({
      productName: event.target.value,
    });
  }
  onChangedQuantity(event) {
    this.setState({
      quantity: event.target.value,
    });
  }
  changeChoice = (catalogue) => {
    this.setState({
      category: catalogue,
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
      <div className="container-fluid col-5">
        <div className="card card-container">
          <Form
            onSubmit={this.handleCreateProduct}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                Image:{" "}
                <img
                  id="imagePath"
                  width="300"
                  height="300"
                  style={{display: "none"}}
                  className="profile-img-card"
                  alt="profile-img"
                />
                <br />
                <Input
                  type="file"
                  accept="image/*"
                  name="imagePath"
                  value={this.state.image}
                  id="file"
                  onChange={this.onChangeImagePath}
                />
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangedDescription}
                    validations={[required,]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="productName"
                    required
                    value={this.state.productName}
                    onChange={this.onChangedProductName}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChangedAuthor}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChangedPrice}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.onChangedQuantity}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>Category: </label>
                  <div className="ml-5">
                    {" "}
                    <DropdownButton
                      className="col-md-5"
                      id="dropdown-item-button"
                      title={
                        this.state.category !== null
                          ? this.state.category.cateName
                          : "Select Category"
                      }
                    >
                      {this.state.categories.map((catalogue) => (
                        <Dropdown.Item
                          onSelect={() => this.changeChoice(catalogue)}
                        >
                          {catalogue.cateName}
                        </Dropdown.Item>
                      ))}
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
                    <span>Create</span>
                  </button>
                </div>
              </div>
            )}

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
