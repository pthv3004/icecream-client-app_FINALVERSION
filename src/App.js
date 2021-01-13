import React, { Component } from "react";
import "./App.css";
import "react-bootstrap";
import IconAdmin from "../src/asset/adminIcon.png";
import IconStaff from "../src/asset/staffIcon.webp";
import IconHome from "../src/asset/homeIcon.webp";
import IconCart from "../src/asset/cartIcon.webp";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import UserManagement from "./components/user-management";
import Home from "./views/home";
import AdminBoard from "./views/admin-page";
import FAQManagement from "./components/faq-management";
import AddNewFAQ from "./components/add-new-faq";
import FeedBackManagement from "./components/feedback-management";
import ChangePassword from "./components/change-password";
import OrderManagement from "./components/order-management";
import OrderDetail from "./components/order-detail";
import ProductManagement from "./components/product-management";
import ProductDetail from "./components/product-detail";
import CreateProduct from "./components/create-product";
import StaffPage from "./views/staff-page";
import ProductOrder from "./components/product-order";
import ProductFeedback from "./components/product-feedback";
import FaqView from "./components/faq-view";
import UserOrder from "./components/user-order";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
      role: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        role: user.role,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, role } = this.state;
    // console.log(role);
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span className="navbar-brand">Vitus Rabbit Meat Shop</span>
          <div className="navbar-nav mr-auto">
            {role === "ROLE_ADMIN" && (
              <li className="nav-item ml-3">
                <Link to={"/admin"} className="nav-link">
                  <img src={IconAdmin} width="30" height="30" alt="" />
                  Admin Board
                </Link>
              </li>
            )}
            {role === "ROLE_STAFF" && (
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link ml-3">
                  <img src={IconStaff} width="30" height="30" alt="" />
                  Staff Board
                </Link>
              </li>
            )}
            {currentUser && role !== "ROLE_ADMIN" && (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link ml-2">
                    <img src={IconHome} width="30" height="30" alt="" />
                    Home Page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user-order"} className="nav-link ml-2">
                    <img src={IconCart} width="30" height="30" alt="" />
                    Order
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/faq-view"} className="nav-link ml-2">
                    FAQ
                  </Link>
                </li>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  <img
                    src="http://localhost:3000/avatar.webp"
                    width="30"
                    height="30"
                    alt=""
                  />
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  <img
                    src="http://localhost:3000/logout.webp"
                    width="30"
                    height="30"
                    alt=""
                  />
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/home"} component={Home} />
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={UserManagement} />
            <Route path="/admin" component={AdminBoard} />
            <Route path="/faq" component={FAQManagement} />
            <Route path="/addNewFAQ" component={AddNewFAQ} />
            <Route path="/feedback" component={FeedBackManagement} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/order" component={OrderManagement} />
            <Route path="/view-order/:id" component={OrderDetail} />
            <Route path="/product" component={ProductManagement} />
            <Route path="/view-product/:id" component={ProductDetail} />
            <Route path="/create-product" component={CreateProduct} />
            <Route path="/staff" component={StaffPage} />
            <Route path="/product-detail/:id" component={ProductOrder} />
            <Route path="/product-feedback/:id" component={ProductFeedback} />
            <Route path="/faq-view" component={FaqView} />
            <Route path="/user-order" component={UserOrder} />
            {/* <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
