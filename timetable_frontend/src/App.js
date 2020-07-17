import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import './App.css';
import Pagination from "./pagination";
import Classes from "./timeTableInput/classes";
import ClassRooms from "./timeTableInput/classrooms";
import Teachers from "./timeTableInput/teachers";
import Courses from "./timeTableInput/courses";

class App extends Component {

  state = {
    classRooms: [],
    classes: [],
    teachers: []
  }

  handleClassRooms = (classRooms) => {
    this.setState({classRooms})
    // console.log(classRooms)
  }

  handleClasses = (classes) => {
    this.setState({classes})
    // console.log(classes)
  }

  handleTeachers = (teachers) => {
    this.setState({teachers})
    // console.log(teachers)
  }

  render(){
    return (
      <div className="App">
        <Pagination />
        
        <Switch>
          <Route path = "/home/classrooms" exact render = {(props) => < ClassRooms {...props} onClassRooms = {this.handleClassRooms} />} />
          <Route path = "/home/classes" exact render={(props) => < Classes {...props} onClasses = {this.handleClasses} />} />
          <Route path = "/home/teachers" exact render = {(props) => <Teachers {...props} onHandleTeachers = {this.handleTeachers} />} />
          <Route path = "/home/courses" exact render = {(props) => <Courses {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
