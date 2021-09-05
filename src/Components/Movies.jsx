import React, { Component } from "react";
import { getMovies } from "../movie_collection";
import Liked from "./Liked";
import Pagination from "./Pagination";
import { paginate } from "../utilities/paginate";
import { getGenre } from "../genre_collection";
import ListGroup from "./ListGroup";
import { Link, NavLink } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genreMovie: [],
    pageSize: 3,
    currentPage: 1,
    selectGenre: {},
  };

  componentDidMount() {
    const genres = [{ name: "All Genre" }, ...getGenre()];
    this.setState({ movies: getMovies(), genreMovie: genres });
  }
  handleDelete = (movie) => {
    const newMovies = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({ movies: newMovies });
  };
  
  
  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenre = (genre) => {
    this.setState({ selectGenre: genre, currentPage: 1 });
  };
  render() {
    const { currentPage, pageSize, movies: allMovies } = this.state;
    if (this.state.movies.length === 0)
      return <p>There is no Movies in your Watch</p>;
    //Filtering our Movie Items
    const filterdMovie =
      this.state.selectGenre && this.state.selectGenre.id
        ? allMovies.filter((m) => m.genre.id === this.state.selectGenre.id)
        : allMovies;
    // Getting Array of movies from paginate function
    const movies = paginate(filterdMovie, currentPage, pageSize);
    return (
      <div>
        <main className="container mt-4">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <ListGroup
                itemsGenre={this.state.genreMovie}
                onHandleGenre={this.handleGenre}
                selectGenre={this.state.selectGenre}
              />
            </div>
            <div className="col">
              <h1>Total {filterdMovie.length} movies in you watch</h1>
              {/* Button To Add New Movies */}
              <NavLink to="/movies/new">
                <button className="btn btn-dark btn-lg p-2">New Movies</button>
              </NavLink>
              {/* ______________________ */}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id}>
                      <td>
                        <Link to={`/moviesform/${movie.id}`}>{movie.name}</Link>
                      </td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.rating}</td>
                      <td>
                        <Liked
                          liked={movie.liked}
                          onCliked={() => this.handleLiked(movie)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pageSize={pageSize}
                itemSize={filterdMovie.length}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Movies;
