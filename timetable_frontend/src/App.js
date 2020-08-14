import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";

import './App.css';
import Pagination from "./pagination";
import Classes from "./timeTableInput/classes";
import ClassRooms from "./timeTableInput/classrooms";
import Teachers from "./timeTableInput/teachers";
import Courses from "./timeTableInput/courses";
import TimeTable from "./timeTableOutput/tableDesign2";
import {generateTableWithPost} from "./http/api";
import Footer2 from "./footer/footer2";


import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


class App extends Component {

//state of component 
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

  // this method will be called by classRooms component when sumbit button clicked in that component
  handleClassRooms = (classRooms) => {
    this.setState({classRooms, progressValue: 25})  //setting the classRooms array and progress value in the state
  }

  // this method will be called by classes component when sumbit button clicked in that component
  handleClasses = (classes) => {
    const sessionsName = [];

    classes.map(clas => {     //map to iterate over classes
      sessionsName.push(clas[0]);   //pushing the classes name into sessionsName
    })

    this.setState({classes, sessionsName, progressValue: 50}) //setting the classes, sessionName array and progress value in the state
  }

  // this method will be called by teachers component when sumbit button clicked in that component
  handleTeachers = (teachers) => {
    const teachersName = [];
    teachers.map(teacher => { //map to iterate over teachers
      teachersName.push(teacher[0]);  //pushing the teacher name into sessionsName
    })

    this.setState({teachers, teachersName, progressValue: 75})  //setting values to the state
  }

  // this method will be called by courses component when sumbit button clicked in that component
  handelCourses = (courses) => {
    this.setState({courses, progressValue: 100})  //setting values to state
  }

  // this method will be called by table component when generateTable button clicked in that component
  generateTable = async() => {
    
    // getting the values from state and making data object to send to the backend through api
    const data = {
      classRooms: this.state.classRooms,
      classes: this.state.classes,
      courses: this.state.courses,
      teachers: this.state.teachers
    }

    //try and cath block to handle exceptions
    try {
      const table = await generateTableWithPost(data);    //calling the function from api component 
      this.setState({generatedTimeTable: table, classRooms: [], classes: [], courses: [], teachers: []})  //setting values to state

      if(table.length === 0){
        toast.error("Table Generate Error input fields are empty");  //if response length is 0 that mean empty data is sended to backend
      }

    } catch (error) {     //exception handling
      toast.error("Table Generate Error: " + error.message);    //showing toast notification on exception in generating table
    }
  }
  
  ///this part is going to render 
  render(){
    const {teachersName, sessionsName, generatedTimeTable, progressValue} = this.state; //values from state
    
    return (
       <div className="App">

        {/* toast notification properties */}
        <ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} /> 
          
        {/* <Route render = {(props) => < PrimarySearchAppBar {...props} />} /> */}
        

        {/* pagination component to track components and progress */}
        <Pagination onProgressValue = {progressValue} />

          {/* the componets in the switch will be handled according to path */}
          <Switch>
            {/* calling the PrimarySearchAppBar component and passing the mehtod reference to call from there*/}
            
            

            {/* if url path matches to /home/classrooms then render this component */}
            <Route path = "/" exact render = {(props) => < ClassRooms {...props} onClassRooms = {this.handleClassRooms} />} />
            
            {/* following compnents will be render on the bases of url path and 
              can be access if progress value will matched with the conditions and 
              passing the values or reference of methods to call from these component like handleClasses*/}
              
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

            {
              progressValue === 100 ? 
              <Route path = "/home/table" exact render = {(props) => <TimeTable {...props} onGenerateTable = {this.generateTable} onGeneratedTimeTable = {generatedTimeTable} />} />
              : null
            }
            {/* if didnot match any of above path then redirect that to this path */}
            <Redirect to="/" />
          </Switch>
        <Footer2 /> {/* footer of the application */}
      </div>
    );
  }
}

export default App;   //default export app componet to handle in index.js file
