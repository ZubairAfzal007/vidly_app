import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi-browser";
class Login extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  scheme = {
    username: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.handleValidate();
    this.setState({ errors: error || {} });
    //if there is any errors  we will stop the server
    if (error) return;
  };
  handleValidate = () => {
    const errors = {};
    const result = Joi.validate(this.state.account, this.scheme, {
      abortEarly: false,
    });
    if (!result.error) return null;
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const { account } = this.state;
    // if (account.username.trim() === "") {
    //   errors.username = "UserName is Required";
    // }
    // if (account.password.trim() === "") {
    //   errors.password = "Password is Required";
    // }
    // return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.scheme[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            type="text"
            name="username"
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            value={account.password}
            type="password"
            name="password"
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />
          <button
            disabled={this.handleValidate()}
            type="submit"
            className="btn btn-dark"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
