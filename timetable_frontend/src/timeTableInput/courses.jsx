import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {toast} from "react-toastify";

// styling of input field
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0f9ac4',
      },
      '&:hover fieldset': {
        borderColor: '#202d42',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


class Courses extends Component {

    state = {
        courses: [
            {name: '', session: '', teacher: '', crHouurs: ''}
        ],  //courses array in state to save the result and handling input fields
        width: 0, height: 0,
        marginLeftTextField: 0,
        buttonDisabled: true    //handling button disable or enable with boolean
    }

    // handling submit button: disable button if input feild do not have value
    sumbitButtonConstraint = (courses) => {
        let count = 0;
        courses.map((course, i) => {
            if(!course.name || !course.session || !course.teacher || !course.crHouurs){
                count++;
            }
        })

        if(count){
            this.setState({buttonDisabled: true})
        }else{
            this.setState({buttonDisabled: false})
        }
    }

    // checking that every input feild should have unique value mean course name should unique
    checkUniqueArray = (courses) => {
        let singleArray = [];

        courses.map(course => {
            singleArray.push(course.name);
        })

        let hasDuplicate = singleArray.some((val, i) => singleArray.indexOf(val) !== i);
        if(hasDuplicate){
            this.setState({buttonDisabled: true})
            toast.error('please enter unique name')
        }
    }


    // handling the input fields with white space
    checkEmptyField = (courses) => {
        let totalCounter = 0;
        courses.map((course, i) => {
            let emptyCounter = 0;
            for(let j = 0; j < course.name.length; j++){
                if(course.name[j] === " "){
                    emptyCounter++;
                }
            }
            if(course.name.length === emptyCounter){
                totalCounter++;
            }
        })
        
        if(totalCounter > 0){           
            this.setState({buttonDisabled: true})            
        }
    }

    // handling the maximum length of input field
    maxLengthConstraint = (courses) => {
        courses.map((course, i) => {
            if(course.name.length > 12){
                this.setState({buttonDisabled: true}) 
                toast.error("Only 12 characters are allowed in course name");    
            }
        })
    }


// handling change in input feild and update in courses acordingly to show in input feild
    handleChange = (e, i, j) => {
        const crditHourArray = [[1, 1, 1], [1, 2], [2, 1], [3], [1, 1], [2], [1]];  //avaiable credit hourse options

        const courses = [...this.state.courses]
        const name = e.target.name; //feild name from input feild

        let value = e.target.value; //input value from input feild

        if(name === "crHouurs"){    //if feild is creditHours then 
            value = crditHourArray[value];
        }

        courses[i][name] = value;
        this.setState({courses})

        this.sumbitButtonConstraint(courses);   //checking that input feild should have value 

        this.checkUniqueArray(courses);     //cheking uniquness of input feild (course name should unique)

        this.checkEmptyField(courses);           // checking white space in input field

        this.maxLengthConstraint(courses);           // checking maximum length in input field


    }

    // this function will add input feild if called
    addMoreField = () => {
        const courses = [...this.state.courses, {name: '', session: '', teacher: '', crHouurs: ''}];
        this.setState({courses});

        this.sumbitButtonConstraint(courses);   //disabling the submit button because here input feild will not have value
        
        this.checkEmptyField(courses);           // checking white space in input field

        this.maxLengthConstraint(courses);           // checking maximum length in input field

    }

    // this function will be called when submit button will be clicked
    handleSubmit = () => {
        const courses = [...this.state.courses];     //getting latest values from the state
        
        // if any value of input feild is empty, then removing it from courses array
        courses.map((course, i) => {
            if(!course.name || !course.session || !course.teacher || !course.crHouurs){
                courses.splice(i, 1);
            }
        })
        
        // sorting the course according to first index of credit hourse in descending order 
        for(let i = 1; i < courses.length; ++i){
            for(let j = 0; j < (courses.length - i); ++j)
                if(courses[j].crHouurs[0] < courses[j+1].crHouurs[0]){
                    
                    let temp = courses[j];
                    courses[j] = courses[j+1];
                    courses[j+1] = temp;
                }
        }

        this.props.onCourses(courses);  //calling function from parent component that is App and sending final result
        this.props.history.push("/home/table"); //going to forward to next page by changing the url
    }

    // if input feild added by mistake with this function that can be removed by pressing the X button this function will be called
    handleRemove = (i) => {
        const courses = [...this.state.courses];
        if(courses.length > 1){
            courses.splice(i, 1);
            this.setState({courses})
        }else{
            toast.error('Add atleast one Course')
        }

        this.sumbitButtonConstraint(courses);

        this.checkEmptyField(courses);           // checking white space in input field

        this.maxLengthConstraint(courses);           // checking maximum length in input field


    }

// handling some styling that can be affected by the resizing of application   ***** start_1 ***** 
    setMarginLeft = () => {
        if(window.innerWidth <= 700){
            this.setState({marginLeftTextField: 20})
        }else{
            this.setState({marginLeftTextField: 0})
        }
    }
     // updaing dimension if size of application is chanegs
    updateDimensions = (i) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if(i === 1){
            this.setMarginLeft();
        }
    };
    
    // will be called when component mount this is to handle some styling by the size of application
    componentDidMount() {
        window.addEventListener('resize', () => this.updateDimensions(1));  //adding event listner of resize to detech the size change of application
        this.setMarginLeft();    //calling function if size of application is changed
        
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));    //removing listner
        this.setMarginLeft();    //calling function if size of application is changed
    }

                                                                              // ***** end_1 *****
    // interface of this component
    render(){
        const {courses, buttonDisabled, marginLeftTextField} = this.state;
        const {onTeachersName, onSessionsName} = this.props;
        return (
            <form noValidate>
                <Grid container row alignItems="center" item xs={12} style={{marginTop: 60}}>
                    
                    {/* maping to courses array to render all input feilds in courses*/}
                    {
                        courses.map((course, i) => {

                             {/* to handle the credit Hourse in select during selection */}
                            let crditValue = '';
                            if(course.crHouurs.length === 3){
                                crditValue = 0;
                            }else if(course.crHouurs[0] === 1 && course.crHouurs[1] === 2){
                                crditValue = 1;
                            }else if(course.crHouurs[0] === 2 && course.crHouurs[1] === 1){
                                crditValue = 2;
                            }else if(course.crHouurs[0] === 3){
                                crditValue = 3;
                            }else if(course.crHouurs[0] === 1 && course.crHouurs[1] === 1){
                                crditValue = 4;
                            }else if(course.crHouurs[0] === 2){
                                crditValue = 5;
                            }else if(course.crHouurs[0] === 1){
                                crditValue = 6;
                            }
                                

                            return (
                                <Grid container key = {i} direction="row" justify="center" alignItems="center" item xs={8} style={{marginTop: 50, marginLeft: 80}}>  
                                    <Grid  container direction="row" justify="flex-end" alignItems="center" item sm={2} style={{marginLeft: marginLeftTextField * -14, marginRight: marginLeftTextField * -1}}>                                  
                                        
                                        {/* to remove the input feild by passing the index of feild */}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick = {() => this.handleRemove(i)}
                                            style={{backgroundColor: "#0f9ac4"}}
                                        >
                                            X
                                        </Button>
                                    </Grid>

                                    <Grid container direction="row" justify="center" alignItems="center" item sm={3} style={{marginLeft: 30, marginRight: -marginLeftTextField * 4}}>                                    
                                        
                                        {/* input feilds here calling the handleChange method to handle input value*/}
                                        <CssTextField
                                            label = {`Course-${i+1} Name`}
                                            variant = "outlined"
                                            id = "custom-css-outlined-input"
                                            value = {course.name}
                                            name = "name"
                                            onChange = {(e) => this.handleChange(e, i)}
                                            size="small"
                                        />
                                    </Grid>

                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} style={{marginTop: marginLeftTextField}} >
                                        <FormControl>
                                            {/* select class from already entered classes */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={course.session}
                                                name = "session"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                {
                                                    onSessionsName.map(session => {
                                                        return (<MenuItem value={session}>{session}</MenuItem>);
                                                    })
                                                }
                                            </Select>
                                            <FormHelperText>Select Class</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} >
                                        <FormControl>
                                            {/* select teacher from already entered teachers */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={course.teacher}
                                                name = "teacher"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                {
                                                    onTeachersName.map(teacher => {
                                                        return (<MenuItem value={teacher}>{teacher}</MenuItem>);
                                                    })
                                                }
                                            </Select>
                                            <FormHelperText>Select Teacher</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" item sm={2} >
                                        <FormControl>
                                            {/* select credit hour pattern from avaibale credit hourse 
                                                slect 1,1,1, if no consective lecture restriction and 
                                                select 3 if want to have consective three lectures
                                            */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={crditValue}
                                                name = "crHouurs"
                                                onChange={(e) => this.handleChange(e, i)}
                                                >
                                                <MenuItem value = {0} >1, 1, 1</MenuItem>   
                                                <MenuItem value = {1} >1, 2</MenuItem>
                                                <MenuItem value = {2} >2, 1</MenuItem>
                                                <MenuItem value = {3} >3</MenuItem> {/* mean consective three crdit hours */}

                                                <MenuItem value = {4} >1, 1</MenuItem>
                                                <MenuItem value = {5} >2</MenuItem>
                                                <MenuItem value = {6} >1</MenuItem>
                                            </Select>
                                            <FormHelperText>Select Credit Hourse</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                         <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start" 
                            item sm={2}
                            style={{marginTop: 40, marginLeft: marginLeftTextField * 7}}
                        >
                        {/* butto to add more feilds by calling the addMoreFeild method */}
                        <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0"}} onClick={this.addMoreField} variant="contained">
                            Add more
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: 40}}
                >
                    {/* submit button to submit current feilds and to go to next step */}
                    <Button
                        variant="contained"
                        style={{backgroundColor: buttonDisabled ? "#e0e0e0":'#2a3547', color: buttonDisabled ? "#c0cad8" : "#d0d6e0"}}
                        endIcon={<SendIcon>send</SendIcon>}
                        onClick = {this.handleSubmit}
                        disabled = {buttonDisabled}
                    >
                    Submit and Next
                    </Button>
                </Grid>
            </form>
        );
    }
}

export default Courses;