import React, {useEffect, useState } from 'react';
import './App.css';
import  { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Cart from "components/Cart";
import Login from "components/Login";
import { authService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  console.log(isLoggedIn)

  useEffect(()=> {
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
    })
  },[])

  return (
    <div className="App">
          <Router>
            <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/" exact>
                  <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                  <Home />
                </Route>
                <Route path="/cart">
                  <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                  <Cart isLoggedIn={isLoggedIn} />
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Footer />
        </Router>
      </div>
  );
}

export default App;
