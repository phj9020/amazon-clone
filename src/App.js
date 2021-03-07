import React, {useEffect } from 'react';
import './App.css';
import  { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Home from "components/Home";
import Cart from "components/Cart";
import Login from "components/Login";
import Payment from "components/Payment";
import { authService } from 'fbase';
import { useDispatch } from 'StateProvider';
import {SETUSER} from 'reducer';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';


const stripePromise  = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    authService.onAuthStateChanged((user)=> {
      
      if(user){
        dispatch({type: SETUSER, user : user})
      } else {
        dispatch({type: SETUSER, user : null})
      }
    })
  },[dispatch])

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
                <Route path="/payment">
                  <Header />
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
            <Footer />
        </Router>
      </div>
  );
}

export default App;
