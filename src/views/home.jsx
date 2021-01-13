import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
      currentUser: undefined,
      products: [],
      welcomeMessage: ""
    };
  }
  componentWillMount(){
    this.setState({
      welcomeMessage: "Đợi tí em đang cởi đồ ....."
    })
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        role: user.role,
       
      });
      if (user.role === "ROLE_ADMIN") {
        this.props.history.push("/profile");
        window.location.reload();
      }
      ProductService.loadAllProducts().then((response) => {
        this.setState({
          products: response.data,
          welcomeMessage:""
        });
      });
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  viewProductDetail = (id) => {
    this.props.history.push("/product-detail/" + id);
  };
  addFeedbackToProduct = (id) => {
    this.props.history.push("/product-feedback/" + id);
  };
  render() {
    return (
      <div className="container-fluid" >
        <div className="card-header">
        {this.state.welcomeMessage}
          <h1 className="card-title font-weight-light text-black-50">
            Welcome to Vitus Rabbit Meat Shop
          </h1>
        </div>
        <div className="card">
          <div className="card-header"></div>
          <div className="row row-cols-1 row-cols-md-3">
            {this.state.products.map((product) => (
              <div key={product.productId} className="col mb-4" height="300px">
                <div className="card" >
                  <img
                    className="card-img-top"
                    alt="rabbit food"
                    src={
                      "http://localhost:3000/images/products/" + product.image
                    }
                    height="250"
                    key={product.productId}
                  />
                  <div className="card-body">
                    <h6 className=" ml-5 card-title text-primary ">
                      {product.productName}
                    </h6>
                    <p className="ml-5 card-text text-success font-weight-bold">
                      Price: {product.price}$
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.viewProductDetail(product.productId)}
                    >
                      Order
                    </button>
                    <button
                      className="btn btn-info ml-5"
                      onClick={() =>
                        this.addFeedbackToProduct(product.productId)
                      }
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
