import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
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



class Classes extends Component {

    state = {
        classes: [{name: ""}],      //classes array in state to save the result and handling input field
        width: 0, height: 0,
        marginLeftTextField: 0,
        buttonDisabled: true    //handling button disable or enable with boolean 
    }

    // handling submit button: disable button if input feild do not have value
    sumbitButtonConstraint = (classes) => {
        let count = 0;
        classes.map((clas, i) => {
            if(!clas.name){
                count++;
            }
        })

        if(count){
            this.setState({buttonDisabled: true})
        }else{
            this.setState({buttonDisabled: false})
        }
    }

    // checking that every input feild should have unique value
    checkUniqueArray = (classes) => {
        let singleArray = [];
        classes.map(clas => {
            singleArray.push(clas.name);
        })
        let hasDuplicate = singleArray.some((val, i) => singleArray.indexOf(val) !== i);
        if(hasDuplicate){
            this.setState({buttonDisabled: true})
            toast.error('please enter unique name')
        }
    }


    // handling the input fields with white space
    checkEmptyField = (classes) => {
        let totalCounter = 0;
        classes.map((clas, i) => {
            let emptyCounter = 0;
            for(let j = 0; j < clas.name.length; j++){
                if(clas.name[j] === " "){
                    emptyCounter++;
                }
            }
            if(clas.name.length === emptyCounter){
                totalCounter++;
            }
        })
        
        if(totalCounter > 0){           
            this.setState({buttonDisabled: true})            
        }
    }


    // handling change in input feild and update in classes acordingly to show in input feild
    handleChange = (e, i) => {
        const classes = [...this.state.classes];
        classes[i].name = e.target.value;
        this.setState({classes})

        this.sumbitButtonConstraint(classes);   //checking that input feild should have value

        this.checkUniqueArray(classes);     //cheking uniquness of input feild

        this.checkEmptyField(classes);      // checking white spaces in input fields
    }

    // this function will add input feild if called
    addMoreField = () => {
        const classes = [...this.state.classes, {name: ""}] 
        this.setState({classes})

        this.sumbitButtonConstraint(classes);   //disabling the submit button because here input feild will not have value
    
        this.checkEmptyField(classes);      // checking white spaces in input fields
    }

    // this function will be called when submit button will be clicked
    handleSubmit = () => {
        const classesArray = [];
        const classes = [...this.state.classes];    //getting latest values from the state
        
        // making class array of names that has been entered
        classes.map(clas => {
            let classArray = [clas.name, [
                ["Monday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Tuesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Wednesday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Thursday", 0, 0, 0, 0, 0, 0, 0, 0],
                ["Friday", 0, 0, 0, 0, 0, 0, 0, 0],
            ]];
            classesArray.push(classArray);
        })

        // if input feild is empty mean class have no name, then removing it from classes array
        classes.map((room, i) => {
            if(!room.name){
                classesArray.splice(i, 1);
            }
        })

        this.props.onClasses(classesArray); //calling function from parent component that is App and sending final result 
        this.props.history.push("/home/teachers")   //going to forward to next page by changing the url
    }

    // if input feild added by mistake with this function that can be removed by pressing the X button this function will be called
    handleRemove = (i) => {
        const classes = [...this.state.classes];

        if(classes.length > 1){
            classes.splice(i, 1);
            this.setState({classes});
        }else{
            toast.error("Enter the Name of Atleast one Class")
        }

        this.sumbitButtonConstraint(classes);

        this.checkEmptyField(classes);      // checking white spaces in input fields
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
    // will be called when component unmount
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateDimensions(0));   //removing listner
        this.setMarginLeft();   //calling function if size of application is changed
    }    

                                                                            // ***** end_1 ***** 
// interface of this component
    render(){
        const {classes, buttonDisabled} = this.state;   //geting values from state by object distructring syntax

        return (
            <form noValidate>
                <Grid container alignItems="center" item xs={12} style={{marginTop: 60}}>
                    {/* maping to classes array to render all input feilds in classes*/}
                    {
                        classes.map((clas, i) => {
                            return (
                                <Grid container key = {i} direction="column" justify="center" alignItems="center" item xs={8} style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * -2}}>  
                                    <Grid only="lg" container direction="row" justify="flex-end" alignItems="center" item sm={7} style={{marginLeft: this.state.marginLeftTextField * 8}} >                                  
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
                                    <Grid container direction="row" justify="flex-end" alignItems="center" item sm={5} style={{marginTop: -40}}>                                    
                                        {/* input feilds here calling the handleChange method to handle input value */}
                                        <CssTextField
                                            label = {`Class-${i+1} Name eg. Session18`}
                                            variant = "outlined"
                                            id = "custom-css-outlined-input"
                                            value = {clas.name}
                                            onChange = {(e) => this.handleChange(e, i)}
                                            size="small"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })
                    }
                         <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start" 
                            item sm={4}
                            style={{marginTop: 20, marginLeft: this.state.marginLeftTextField * 2}}
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

export default Classes;