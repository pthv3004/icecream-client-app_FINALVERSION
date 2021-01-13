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
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.onChangedAuthor = this.onChangedAuthor.bind(this);
    this.onChangedDescription = this.onChangedDescription.bind(this);
    this.onChangedProductName = this.onChangedProductName.bind(this);
    this.onChangedPrice = this.onChangedPrice.bind(this);
    this.onChangedQuantity = this.onChangedQuantity.bind(this);
    this.onChangeImagePath = this.onChangeImagePath.bind(this);
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
    this.state = {
      id: this.props.match.params.id,
      productId: undefined,
      image: "",
      description: "",
      productName: "",
      author: "",
      uploadDate: "",
      price: 0,
      quantity: 0,
      category: {},
      enable: true,
      loading: false,
      message: "",
      imagePath: "",
      categories: [],
    };
  }
  handleUpdateProduct(event) {
    event.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let imageTemp = "";
      if (this.state.imagePath) {
        imageTemp = this.state.imagePath;
      } else {
        imageTemp = this.state.image;
      }
      let productDTO = {
        productId: this.state.productId,
        image: imageTemp,
        description: this.state.description,
        productName: this.state.productName,
        author: this.state.author,
        uploadDate: this.state.uploadDate,
        price: this.state.price,
        quantity: this.state.quantity,
        category: this.state.category,
        enable: this.state.enable,
      };
      ProductService.updateProduct(this.state.productId, productDTO).then(
        (response) => {
          alert(response.data.message);
          this.props.history.push("/product");
          window.location.reload();
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
  changeStatus = (status) => {
    this.setState({
      enable: status,
    });
  };
  changeChoice = (catalogue) => {
    this.setState({
      category: catalogue,
    });
  };
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
      ProductService.getProductById(this.state.id).then((res) => {
        this.setState({
          productId: res.data.productId,
          image: res.data.image,
          description: res.data.description,
          productName: res.data.productName,
          author: res.data.author,
          uploadDate: res.data.uploadDate,
          price: res.data.price,
          quantity: res.data.quantity,
          category: res.data.category,
          enable: res.data.enable,
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
  onChangeImagePath(event) {
    let image = document.getElementById("imagePath");
    image.style.display = "inline";
    image.src = URL.createObjectURL(event.target.files[0]);
    this.setState({
      imagePath: event.target.value,
    });
  }
  render() {
    return (
      <div className="container-fluid col-5">
        <h1 className="text-info">Product Detail</h1>
        <hr />
        <div className="card card-container col-md-10">
          <Form
            onSubmit={this.handleUpdateProduct}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              Product Image:
              {this.state.image === null ? (
                <div>
                  <img
                    id="imagePath"
                    width="300"
                    height="300"
                    style={{ display: "none" }}
                    className="profile-img-card"
                    alt="profile-img"
                  />
                  <br />
                  <Input
                    type="file"
                    accept="image/*"
                    name="imagePath"
                    value=""
                    id="file"
                    onChange={this.onChangeImagePath}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      "http://localhost:3000/images/products/" +
                      this.state.image
                    }
                    id="imagePath"
                    width="300"
                    height="300"
                    alt=""
                    className="profile-img-card"
                  />
                  <br />
                  <Input
                    type="file"
                    accept="image/*"
                    name="imagePath"
                    value=""
                    id="file"
                    onChange={this.onChangeImagePath}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="productId">ID</label>
              <Input
                type="text"
                className="form-control"
                name="productId"
                value={this.state.productId}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={this.state.description}
                onChange={this.onChangedDescription}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <Input
                type="text"
                className="form-control"
                name="productName"
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
              <label htmlFor="uploadDate">Upload Date</label>
              <Input
                type="text"
                className="form-control"
                name="uploadDate"
                value={this.state.uploadDate}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <Input
                type="text"
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
            <div className="form-group">
            <label>Enable: </label>
              <div className="ml-5">
              <DropdownButton
                className="col-md-5"
                id="dropdown-item-button"
                title={this.state.enable === true ? "true" : "false"}
              >
                <Dropdown.Item
                  onSelect={() => this.changeStatus(false)}
                >
                  false
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => this.changeStatus(true)}
                >
                  true
                </Dropdown.Item>
              </DropdownButton>
              </div>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Update</span>
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
