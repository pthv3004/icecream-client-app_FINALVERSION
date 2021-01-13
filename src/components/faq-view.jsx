import React, { Component } from "react";
import FaqService from "../services/faq.service";
import AuthService from "../services/auth.service";

export default class FaqView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      FaqService.getAllFaq().then((response) => {
        this.setState({
          faqs: response.data,
        });
      });
    } else {
      this.props.history.push("/login");
      window.location.reload();
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-header bg-info">
            <h1>Frequently Asked Questions</h1>
          </div>
          {this.state.faqs.map((faq) => (
            <div className="card-body bg-gray">
              <p> Questions: {faq.question}</p>
              <p> Answer: {faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
