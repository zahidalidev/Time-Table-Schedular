import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import cTable from 'console.table';

import './App.css';
import Pagination from "./pagination";
import Classes from "./timeTableInput/classes";
import ClassRooms from "./timeTableInput/classrooms";
import Teachers from "./timeTableInput/teachers";
import Courses from "./timeTableInput/courses";
import TimeTable from "./timeTableOutput/timeTable";
import {generateTableWithPost} from "./http/api";

class App extends Component {

  state = {
    classRooms: [],
    classes: [],
    teachers: [],
    courses: [],
    sessionsName: [],
    teachersName: []
  }

  handleClassRooms = (classRooms) => {
    this.setState({classRooms})
  }

  handleClasses = (classes) => {
    const sessionsName = [];
    classes.map(clas => {
      sessionsName.push(clas[0]);
    })

    this.setState({classes, sessionsName})
  }

  handleTeachers = (teachers) => {
    const teachersName = [];
    teachers.map(teacher => {
      teachersName.push(teacher[0]);
    })

    this.setState({teachers, teachersName})
  }

  handelCourses = (courses) => {
    this.setState({courses})
    console.log(courses)
  }

  generateTable = async() => {
    const data = {
      classRooms: this.state.classRooms,
      classes: this.state.classes,
      courses: this.state.courses,
      teachers: this.state.teachers
    }
    const table = await generateTableWithPost(data);
    console.log("table: ", table)
  }
  
  render(){
    const {teachersName, sessionsName} = this.state;

    return (
      <div className="App">
        <Pagination />
        
        <Switch>
          <Route path = "/home/classrooms" exact render = {(props) => < ClassRooms {...props} onClassRooms = {this.handleClassRooms} />} />
          <Route path = "/home/classes" exact render={(props) => < Classes {...props} onClasses = {this.handleClasses} />} />
          <Route path = "/home/teachers" exact render = {(props) => <Teachers {...props} onHandleTeachers = {this.handleTeachers} />} />
          <Route path = "/home/courses" exact render = {(props) => <Courses {...props} onTeachersName = {teachersName} onSessionsName = {sessionsName} onCourses = {this.handelCourses} />} />
          <Route path = "/home/table" exact render = {(props) => <TimeTable {...props} onGenerateTable = {this.generateTable} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
