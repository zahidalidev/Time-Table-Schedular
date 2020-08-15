import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PrimarySearchAppBar from "./appBar/appBar";
import * as serviceWorker from './serviceWorker';
import Footer2 from "./footer/footer2";


import {BrowserRouter, Route} from "react-router-dom";

// BrowserRouter for routing here
ReactDOM.render(
  <BrowserRouter>     
    <Route render = {(props) => < PrimarySearchAppBar {...props} />} />
  </BrowserRouter>,
  document.getElementById('navBAr')
);

ReactDOM.render(
  <BrowserRouter>     
    <App />   {/* App component is going to render in div with the id root*/ }
  </BrowserRouter>,
  document.getElementById('root')
);

ReactDOM.render(
  <BrowserRouter> 
    <Footer2 /> {/* footer of the application */}
  </BrowserRouter>,
  document.getElementById('reactFooter')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
