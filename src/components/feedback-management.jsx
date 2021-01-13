import React, { Component } from "react";
import AuthService from "../services/auth.service";
import FeedbackService from "../services/feedback.service";
export default class FeedBackManagement extends Component {
  constructor(props) {
    super(props);
    this.deleteFeedback = this.deleteFeedback.bind(this);
    this.state = {
      feedbacks: [],
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user,
    });
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
      window.location.reload();
    }
    FeedbackService.getAllFeedback().then((response) => {
      this.setState({
        feedbacks: response.data,
      });
    });
  }
  deleteFeedback(id) {
    console.log(this.state.currentUser.accessToken);
    FeedbackService.disableFeedback(id).then((res) => {
      window.location.reload();
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="/faq">
              FAQ Management
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/feedback">
              Feedback Management
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/addNewFAQ">
              Add New FAQ
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

        <h2 className="text-center">Feedback List</h2>
        <br />
        <div className="row">
          <table className="table table-tripped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>FullName</th>
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.id}</td>
                  <td>{feedback.fullName}</td>
                  <td>{feedback.title}</td>
                  <td>{feedback.content}</td>
                  <td>
                    <button
                      onClick={() => this.deleteFeedback(feedback.id)}
                      className="btn btn-danger"
                    >
                      Delete
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
