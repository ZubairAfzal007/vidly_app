import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
class Register extends Component {
  state = {
    account: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.handleValidate();
    this.setState({ errors: error || {} });

    if (error) return;
  };
  handleValidate = () => {
    const errors = {};
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            type="email"
            name="username"
            label="Username"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            value={account.password}
            type="password"
            name="password"
            label="Password"
            error={errors.password}
            onChange={this.handleChange}
          />
          <Input
            value={account.name}
            error={errors.name}
            name="name"
            label="Name"
            onChange={this.handleChange}
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

export default Register;
