import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import { getMovies, saveMovie } from "../movie_collection";
import { getGenre } from "../genre_collection";

class NewMovies extends Component {
  state = {
    movie: [],
    genreMovie: [],
    newMovie: {
      id: Date.now().toString(),
      title: "",
      genre: { id: Date.now().toString(), name: "" },
      stock: "",
      rating: "",
    },
    errors: {},
  };
  componentDidMount() {
    const genres = [{ name: "All Genre" }, ...getGenre()];
    this.setState({ movie: getMovies(), genreMovie: genres });
  }
  handleAddMovie = () => {};
  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    stock: Joi.number().min(1).max(10).required(),
    rating: Joi.number().min(1).max(5).required(),
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.handleValidate();
    this.setState({ errors: error || {} });

    //Submitting Movies
    saveMovie(this.state.newMovie);
    this.props.history.replace('/movies');

  };
  handleValidate = () => {
    const errors = {};
    const result = Joi.validate(this.state.newMovie, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleChange = (e) => {
    //Handling Errors
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    //Handling inputs
    const movie = { ...this.state.newMovie };
    movie[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ newMovie: movie, errors });
  };
  handleGenre = (e) => {
    const movie = { ...this.state.newMovie };
    movie[e.currentTarget.name]["name"] = e.currentTarget.value;
    this.setState({ newMovie: movie });
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  render() {
    return (
      <div>
        <h1>Add New Movies</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={this.state.newMovie.title}
            name="title"
            label="Title"
            onChange={this.handleChange}
            error={this.state.errors.title}
          />
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Genre</label>
            <select
              value={this.state.newMovie.genre['name']}
              onChange={this.handleGenre}
              name="genre"
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option value="Select Genre">Select Genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
            </select>
            {this.state.newMovie.genre['name'] === "Select Genre" && (
              <div className="alert alert-danger">
                "Select Valid Movie Category"
              </div>
            )}
          </div>
          <Input
            value={this.state.newMovie.stock}
            name="stock"
            label="Number of Stock"
            onChange={this.handleChange}
            error={this.state.errors.stock}
          />
          <Input
            value={this.state.newMovie.rating}
            name="rating"
            label="Rate"
            onChange={this.handleChange}
            error={this.state.errors.rating}
          />
          <button
            //disabled={this.handleValidate()}
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

export default NewMovies;
