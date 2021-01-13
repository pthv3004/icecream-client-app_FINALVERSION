import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
export default class ProductManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      role:undefined,
      products: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
      window.location.reload();
    }
    this.setState({
      currentUser: user,
      role : user.role
    })
    ProductService.getAllProduct().then((response) => {
      this.setState({
        products: response.data,
      });
    });
  }
  viewProductDetail = (id) => {
    this.props.history.push("/view-product/" + id);
  };
  render() {
    return (
      <div>
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
          <li className="nav-item">
            <a className="nav-link active" href="/create-product">
              Add new Product
            </a>
          </li>
        </ul>
        <h2 className="text-center">Product List</h2>
        <br />
        <div className="row">
          <table className="table table-tripped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Description</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Catalogue</th>
                <th>Enable</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.author}</td>
                  <td>{product.description}</td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.cateName}</td>
                  <td>{product.enable === true ? "True" : "False"}</td>
                  <td>
                    <button
                      onClick={() => this.viewProductDetail(product.productId)}
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
