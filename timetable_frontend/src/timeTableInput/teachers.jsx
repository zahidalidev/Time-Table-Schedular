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
import Divider from '@material-ui/core/Divider';
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


class Teachers extends Component {

    state = {
        teachers: [
            ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]],    //teacher array in state to save the result and handling input field

        width: 0, height: 0,
        marginLeftTextField: 0,
        buttonDisabled: true    //handling button disable or enable with boolean
    }

    // handling submit button: disable button if input feild do not have value mean if teacher do not have name
    sumbitButtonConstraint = (teachers) => {
        let count = 0;
        teachers.map(teacher => {
            if(!teacher[0]){
                count++;
            }
        })

        if(count){
            this.setState({buttonDisabled: true})
        }else{
            this.setState({buttonDisabled: false})
        }
    }

    // checking that every input feild should have unique value mean teacher name should be unique
    checkUniqueArray = (teachers) => {
        let singleArray = [];
        teachers.map(teacher => {
            singleArray.push(teacher[0]);
        })
        let hasDuplicate = singleArray.some((val, i) => singleArray.indexOf(val) !== i);
        if(hasDuplicate){
            this.setState({buttonDisabled: true})
            toast.error('please enter unique name')
        }
    }


    // handling the input fields with white space
    checkEmptyField = (teachers) => {
        let totalCounter = 0;
        teachers.map((teacher, i) => {
            let emptyCounter = 0;
            for(let j = 0; j < teacher[0].length; j++){
                if(teacher[0][j] === " "){
                    emptyCounter++;
                }
            }
            if(teacher[0].length === emptyCounter){
                totalCounter++;
            }
        })
        
        if(totalCounter > 0){           
            this.setState({buttonDisabled: true})            
        }
    }

    // handling change in input feild and update in teachers acordingly to show in input feild
    handleChange = (e, i, j, k) => {

        // j is the index of day, i is the index of filed and e is event taht containt feild name and value
        const teachers = [...this.state.teachers];  //values from the state to handle change
        
        if(k === undefined){    //k is index of hourse slots
            teachers[i][j] = e.target.value;
        }else{
            teachers[i][1][j][k] = e.target.value;
        }

        this.setState({teachers})

        this.sumbitButtonConstraint(teachers);  //checking that input feild should have value mean teacher hve name

        this.checkUniqueArray(teachers);    //cheking uniquness of input feild

        this.checkEmptyField(teachers);     //checking white space in input field
    }

    // this function will add input feild if called
    addMoreField = () => {
        const teachers = [...this.state.teachers, ["", [
            ["Monday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Tuesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Wednesday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Thursday", 1, 1, 1, 1, 1, 1, 1, 1],
            ["Friday", 1, 1, 1, 1, 1, 1, 1, 1],
        ]]]
        this.setState({teachers});

        this.sumbitButtonConstraint(teachers);  //disabling the submit button because here input feild will not have value
        
        this.checkEmptyField(teachers);     //checking white space in input field
    }

    // this function will be called when submit button will be clicked
    handleSubmit = () => {
        const teachers = [...this.state.teachers];  //getting latest values from the state

        // if input feild is empty mean teacher have no name, then removing it from teachers array
        teachers.map((teacher, i) => {
            if(!teacher[0]){
                teachers.splice(i, 1);
            }
        })
        this.props.onHandleTeachers(teachers);  //calling function from parent component that is App and sending final result
        this.props.history.push("/home/courses");   //going to forward to next page by changing the url
    }

    // if input feild added by mistake with this function that can be removed by pressing the X button this function will be called
    handleRemove = (i) => {
        const teachers = [...this.state.teachers];
        if(teachers.length > 1){
            teachers.splice(i, 1);
            this.setState({teachers});
        }else{
            toast.error("Add atleast one teacher!")
        }

        this.sumbitButtonConstraint(teachers);

        this.checkEmptyField(teachers);     //checking white space in input field
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
        this.setMarginLeft();   //calling function if size of application is changed
    }
    //will be called when component will unmount
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));   //removing listner
        this.setMarginLeft();   //calling function if size of application is changed
    }

                                                                             // ***** end_1 *****
    
    // interface of this component   
    render(){
        const { teachers, marginLeftTextField, buttonDisabled } = this.state;   //geting values from state by object distructring syntax
        const leftMargin = marginLeftTextField === 0 ? marginLeftTextField * -4 + 70 : 70;  //styling conditinally

        return (
            <form noValidate>
                <Grid container alignItems="center" item xs={12} style={{marginTop: 60}}>
                    <Grid container direction="row" justify="center" alignItems="center" item xs={12} style={{marginTop: 50, marginBottom: 0 }}>  
                         <p><span style={{color: "red"}}>*</span><b>Select <span style={{color: "red"}}>"0"</span> if teacher is available and <span style={{color: "red"}}>"1"</span> if teacher is busy in below time slots</b></p>
                    </Grid>
                    
                    {/* maping to teachers array to render all input feilds in teachers*/}
                    {
                        teachers.map((teacher, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={9} style={{marginTop: 50, marginLeft: marginLeftTextField }}>  
                                    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={4} item sm={12}>                                    
                                        <Grid container direction="row" justify="flex-end" alignItems="center" item xs={4} style={{paddingLeft: {leftMargin}, paddingRight: marginLeftTextField * -3, marginRight: marginLeftTextField * 3.2}}>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={marginLeftTextField === 0 ? 4 : 1} >
                                                 {/* to remove the input feild by passing the index of feild */}
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick = {() => this.handleRemove(i)}
                                                    style={{marginRight: 20, backgroundColor: "#0f9ac4"}}
                                                >
                                                    X
                                                </Button>
                                            </Grid>
                                            <Grid container direction="row" justify="flex-end" alignItems="center" item xs={marginLeftTextField === 0 ? 8 : 11} >
                                                
                                                {/* input feilds here calling the handleChange method to handle input value*/}
                                                <CssTextField
                                                    label = {marginLeftTextField === 0 ? `Teacher-${i+1} Name` : null}
                                                    variant = "outlined"
                                                    id = "custom-css-outlined-input"
                                                    value = {teacher[0]}
                                                    onChange = {(e) => this.handleChange(e, i, 0)}
                                                    size="small"
                                                    
                                                />
                                                {marginLeftTextField === 0 ? null : 
                                                    <FormHelperText id="standard-weight-helper-text">Teacher-{i+1} Name</FormHelperText>
                                                }
                                                
                                            </Grid>
                                        </Grid>

                                        {/* maping to teacher table slots of all hourse of all days */}
                                        {teacher[1].map((week, j) => {
                                            // sm10
                                            return (
                                                <Grid container key = {j} direction="row" justify="center" alignItems="center" item xs={marginLeftTextField ? 10 : 8}>
                                                    <p style={{marginRight: 20}} >{week[0]}</p> {/* name of day */}
                                                    
                                                    {/* all hourse(8AM to 4PM) of days 
                                                        here 0 mean teacher is avaiable and 1 mean teacher is not available
                                                    */}
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[1] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[1]}
                                                            onChange={(e) => this.handleChange(e, i, j, 1)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>8-9AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[2] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[2]}
                                                            onChange={(e) => this.handleChange(e, i, j, 2)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>9-10AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[3] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[3]}
                                                            onChange={(e) => this.handleChange(e, i, j, 3)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>10-11AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[4] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[4]}
                                                            onChange={(e) => this.handleChange(e, i, j, 4)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>11-12AM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[5] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[5]}
                                                            onChange={(e) => this.handleChange(e, i, j, 5)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>12-1PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[6] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[6]}
                                                            onChange={(e) => this.handleChange(e, i, j, 6)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>1-2PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[7] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[7]}
                                                            onChange={(e) => this.handleChange(e, i, j, 7)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>2-3PM</FormHelperText>
                                                    </FormControl>
                                                    <FormControl>
                                                        <Select
                                                            style={{marginRight: 20, color: week[8] == 0 ? "#0f9ac4" : "red" }}
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={week[8]}
                                                            onChange={(e) => this.handleChange(e, i, j, 8)}
                                                            >
                                                            <MenuItem style={{color: "blue"}} value={0}>0</MenuItem>
                                                            <MenuItem style={{color: "red"}} value={1}>1</MenuItem>
                                                        </Select>
                                                        <FormHelperText>3-4PM</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                    <Divider style={{width: "80%", marginLeft: 120, marginTop: 30}} />
                                </Grid>
                            );
                        })
                    }
                    <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start" 
                    item sm={3}
                    style={{marginTop: 20, marginLeft: marginLeftTextField * 2}}
                    >
                        {/* butto to add more feilds by calling the addMoreFeild method */}
                        <Button style={{backgroundColor: "#2a3547", color: "#d0d6e0"}} onClick={this.addMoreField} variant="contained" >
                            Add more
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center" 
                    item xs={12}
                    style={{ marginTop: 40, marginBottom: 100}}
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

export default Teachers;