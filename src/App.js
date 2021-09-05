import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./Components/Customers";
import Movies from "./Components/Movies";
import Rental from "./Components/Rental";
import NavBar from "./Components/NavBar";
import NoFound from "./Components/NoFound";
import MoviesForm from "./Components/MoviesForm";
import Login from "./Components/Login";
import "./App.css";
import Register from "./Components/Register";
import NewMovies from "./Components/NewMovies";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/moviesform/:id" exact component={MoviesForm}></Route>
          <Route path="/movies/new" exact component={NewMovies}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/movies" exact component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rental" component={Rental}></Route>
          <Route path="/no-found" component={NoFound}></Route>
          <Redirect from="/" exact to="/movies"></Redirect>
          <Redirect to="/no-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
