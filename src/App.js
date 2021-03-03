import React from 'react';
import './App.css';
import  { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Cart from "components/Cart";

function App() {
  return (
    <div className="App">
          <Router>
            <Header />
            <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/cart" component={Cart}/>
             
            </Switch>
            <Footer />
        </Router>
      </div>
  );
}

export default App;
