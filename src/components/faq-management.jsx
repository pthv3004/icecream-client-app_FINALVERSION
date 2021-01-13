import React, { Component } from "react";
import FaqService from "../services/faq.service";
import AuthService from "../services/auth.service";
export default class faqManagement extends Component {
  constructor(props) {
    super(props);
    this.deleteFaq = this.deleteFaq.bind(this);
    this.state = {
      faqs: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
      window.location.reload();
    }
    FaqService.getAllFaq().then((response) => {
      this.setState({
        faqs: response.data,
      });
    });
  }
  deleteFaq(id) {
    FaqService.deleteFaq(id).then((res) => {
      this.setState({
        faqs: this.state.faqs.filter((faq) => faq.faqId !== id),
      });
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

        <h2 className="text-center">FAQs List</h2>
        <div className="row"></div>
        <br />
        <div className="row">
          <table className="table table-tripped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.faqs.map((faq) => (
                <tr key={faq.faqId}>
                  <td>{faq.faqId}</td>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td>
                    <button
                      onClick={() => this.deleteFaq(faq.faqId)}
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
