import React, { Component } from "react";
import AuthService from "../services/auth.service";
import FAQService from "../services/faq.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required.
      </div>
    );
  }
};
export default class AddNewFAQ extends Component {
  constructor(props) {
    super(props);
    this.onchangeAnswer = this.onchangeAnswer.bind(this);
    this.onchangeQuestion = this.onchangeQuestion.bind(this);
    this.handleCreateFAQ = this.handleCreateFAQ.bind(this);
    this.state = {
      question: "",
      answer: "",
      faqId: undefined,
      enable: true,
      successful: false,
      loading: false,
      message: "",
    };
  }
  onchangeQuestion(event) {
    this.setState({
      question: event.target.value,
    });
  }
  onchangeAnswer(event) {
    this.setState({
      answer: event.target.value,
    });
  }
  handleCreateFAQ(event) {
    event.preventDefault();
    this.setState({
      message: "",
      success: false,
      loading: true,
    });
    if (this.checkBtn.context._errors.length === 0) {
      let FaqDTO = {
        question: this.state.question,
        answer: this.state.answer,
        faqId: 0,
        enable: true,
      };
      FAQService.save(FaqDTO).then(
        (response) => {
          this.props.history.push("/faq");
        },
        (error) => {
          const responseMessage = error.response.data.message;

          this.setState({
            successful: false,
            message: responseMessage,
            loading: false,
          });
        }
      );
    }
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user.role === "ROLE_USER") {
      this.props.history.push("/login");
      window.location.reload();
    }
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
        </ul>
        <h1 className="text-center">Add New FAQ </h1>
        <Form
          onSubmit={this.handleCreateFAQ}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="question">Question</label>
                <Input
                  type="text"
                  className="form-control"
                  name="question"
                  required
                  value={this.state.question}
                  onChange={this.onchangeQuestion}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="answer">Answer</label>
                <Input
                  type="text"
                  className="form-control"
                  name="answer"
                  required
                  value={this.state.answer}
                  onChange={this.onchangeAnswer}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save</span>
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
    );
  }
}
