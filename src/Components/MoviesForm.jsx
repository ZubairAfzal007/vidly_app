import React from "react";

function MoviesForm({ match, history }) {
  return (
    <div>
      <h1>Movies Form {match.params.id}</h1>
      <button
        onClick={() => history.push("/movies")}
        className="btn btn-lg btn-dark"
      >
        Save
      </button>
    </div>
  );
}

export default MoviesForm;
