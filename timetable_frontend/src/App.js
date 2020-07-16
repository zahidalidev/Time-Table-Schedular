import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import './App.css';
import Pagination from "./pagination";
import Classes from "./timeTableInput/classes";
import ClassRooms from "./timeTableInput/classrooms";
import Teachers from "./timeTableInput/teachers";
import Courses from "./timeTableInput/courses";

class App extends Component {
  render(){
    return (
      <div className="App">
        <Pagination />
        
        <Switch>
          <Route path = "/home/classrooms" exact render = {(props) => < ClassRooms {...props} />} />
          <Route path = "/home/classes" exact render={(props) => < Classes {...props} />} />
          <Route path = "/home/teachers" exact render = {(props) => <Teachers {...props} />} />
          <Route path = "/home/courses" exact render = {(props) => <Courses {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
