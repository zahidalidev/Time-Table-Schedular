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
import Footer from "./footer/footer";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

class App extends Component {

  state = {
    classRooms: [],
    classes: [],
    teachers: [],
    courses: [],
    sessionsName: [],
    teachersName: [],
    generatedTimeTable: [],
    progressValue: 0
  }

  handleClassRooms = (classRooms) => {
    this.setState({classRooms, progressValue: 25})
  }

  handleClasses = (classes) => {
    const sessionsName = [];
    classes.map(clas => {
      sessionsName.push(clas[0]);
    })

    this.setState({classes, sessionsName, progressValue: 50})
  }

  handleTeachers = (teachers) => {
    const teachersName = [];
    teachers.map(teacher => {
      teachersName.push(teacher[0]);
    })

    this.setState({teachers, teachersName, progressValue: 75})
  }

  handelCourses = (courses) => {
    this.setState({courses, progressValue: 100})
  }

  generateTable = async() => {
    const data = {
      classRooms: this.state.classRooms,
      classes: this.state.classes,
      courses: this.state.courses,
      teachers: this.state.teachers
    }
    // console.log(data)

    try {
      const table = await generateTableWithPost(data);
      // this.setState({generatedTimeTable: table, classRooms: [], classes: [], courses: [], teachers: []})
      this.setState({generatedTimeTable: table, classRooms: [], classes: [], courses: [], teachers: []})

      if(table.length === 0){
        toast.error("Table Generate Error input fields are empty",);
      }

    } catch (error) {
      toast.error("Table Generate Error: " + error.message);
    }
  }
  
  render(){
    const {teachersName, sessionsName, generatedTimeTable, progressValue} = this.state;
    
    return (
      <div className="App">
        {/* toastify container */}
        <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} />
        
        <Pagination onProgressValue = {progressValue} />
        
        <Switch>
          <Route path = "/home/classrooms" exact render = {(props) => < ClassRooms {...props} onClassRooms = {this.handleClassRooms} />} />
          
          {
            progressValue === 25 ? 
            <Route path = "/home/classes" exact render={(props) => < Classes {...props} onClasses = {this.handleClasses} />} />
            : null
          }

          {
            progressValue === 50 ? 
            <Route path = "/home/teachers" exact render = {(props) => <Teachers {...props} onHandleTeachers = {this.handleTeachers} />} />
            : null
          }
          
          {
            progressValue === 75 ? 
            <Route path = "/home/courses" exact render = {(props) => <Courses {...props} onTeachersName = {teachersName} onSessionsName = {sessionsName} onCourses = {this.handelCourses} />} />
            : null
          }

          <Route path = "/home/table" exact render = {(props) => <TimeTable {...props} onGenerateTable = {this.generateTable} onGeneratedTimeTable = {generatedTimeTable} />} />
          {/* {
            progressValue === 100 ? 
            : null
          } */}
          <Redirect to="/home/classrooms" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
