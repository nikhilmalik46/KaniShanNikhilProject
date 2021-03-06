import React, { useState, useEffect, useRef } from "react";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FirstPage from "./firstPage";
import detailsPage from "./detailsPage";
import cart from "./cart";
import creducer from "./cart/cartReducer";
import { Switch } from "antd";
import cstore from "./cart/cartStore";
import { Link } from "react-router-dom";

export default function Grid() {
  const [list, setList] = useState([]);
  useEffect(() => {
    store.dispatch({
      type: "initialize",
      payload: {
        value: [],
      },
    });
  }, []);

  store.subscribe(() => {
    setList(store.getState().listing);
  });

  console.log(list.length);
  //store.reducerManager.add("cart", creducer)

  const [clist, setcList] = useState([]);
  store.subscribe(() => {
    setcList(store.getState().cart);
  });
  console.log(88);
  //console.log(clist.length);

  return (
    <Router>
      <nav className="nav-wrapper">
        <div className="container">
          <ul className="right">
            <li>
              <Link to="/" className="brand-logo">
                <img
                  src="https://www.bmcsoftware.com.au/content/experience-fragments/bmc/language-masters/en/customerspotlights/deutsche-telekomag/deutsche-telekomag/_jcr_content/root/customer_spotlight/logo.img.png"
                  className="logo"
                  alt="logo"
                />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="nav-text"
                style={{ textDecoration: "none" }}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/cart/"
                className="nav-text"
                style={{ textDecoration: "none" }}
              >
                My cart
              </Link>
            </li>
            <li>
              <Link to="/cart/">
                <img
                  src="https://t7.rbxcdn.com/7944ec53125aaf6a278deaaa64976817"
                  className="cart-logo"
                  alt="cart-logo"
                ></img>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Route path="/cart/" exact component={() => cart(clist)}></Route>

      <Route
        path="/:id"
        exact
        strict
        component={({ match }) => detailsPage(match, list)}
      ></Route>
      <Route
        path="/"
        exact
        component={() => <FirstPage list={list}></FirstPage>}
      ></Route>
    </Router>
  );
}
