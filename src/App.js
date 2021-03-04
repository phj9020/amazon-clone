import React from 'react';
import './App.css';
import  { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Cart from "components/Cart";
import Login from "components/Login";

function App() {
  return (
    <div className="App">
          <Router>
            
            <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/" exact>
                  <Header />
                  <Home />
                </Route>
                <Route path="/cart">
                  <Header />
                  <Cart />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Footer />
        </Router>
      </div>
  );
}

export default App;
